// Dumps Shopify catalogs, builds a local title->image index, fuzzy-matches each
// remaining product, downloads the matched image. Strict threshold + logs for review.
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const STORES = ['smokecartel.com', 'www.dankgeek.com', 'www.grasscity.com']
const OUT = 'public/images/products'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
const THRESHOLD = 0.5
const STOP = new Set(['the', 'and', 'with', 'pack', 'box', 'ct', 'pc', 'pcs', 'piece', 'pieces',
  'single', 'assortment', 'assorted', 'organic', 'natural', 'premium', 'count', 'for', 'of'])

function toks(s) {
  return s.toLowerCase().replace(/["'".]/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ')
    .filter((t) => t && t.length > 1 && !STOP.has(t) && !/^\d+ct$/.test(t))
}

// IDF-weighted recall: shared rare tokens (sizes/brands/models) dominate the
// score; common words barely move it. Penalizes candidates whose own
// distinctive tokens are absent from our name (likely a different product).
let IDF = new Map()
function buildIdf(idx) {
  const N = idx.length
  const df = new Map()
  for (const e of idx) for (const t of new Set(e.toks)) df.set(t, (df.get(t) || 0) + 1)
  IDF = new Map([...df].map(([t, d]) => [t, Math.log(N / d)]))
}
function w(t) { return IDF.get(t) ?? Math.log(8988) }
function scoreToks(nt, ct) {
  const C = new Set(ct), Nset = new Set(nt)
  let shared = 0, total = 0, extra = 0
  for (const t of Nset) { total += w(t); if (C.has(t)) shared += w(t) }
  for (const t of C) if (!Nset.has(t)) extra += w(t)
  if (total === 0) return 0
  const recall = shared / total
  const penalty = extra / (extra + shared + 1e-9) // how much of candidate is "foreign"
  return recall * (1 - 0.5 * penalty)
}

async function buildIndex() {
  if (fs.existsSync('scripts/catalog.json')) {
    const idx = JSON.parse(fs.readFileSync('scripts/catalog.json', 'utf8'))
    console.log('loaded cached catalog:', idx.length)
    return idx
  }
  const idx = []
  for (const store of STORES) {
    for (let page = 1; page <= 12; page++) {
      try {
        const res = await fetch(`https://${store}/products.json?limit=250&page=${page}`,
          { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(25000) })
        if (!res.ok) break
        const data = await res.json()
        if (!data.products || !data.products.length) break
        for (const p of data.products) {
          const img = p.images && p.images[0] && p.images[0].src
          if (img) idx.push({ title: p.title, img, toks: toks(p.title) })
        }
        if (data.products.length < 250) break
      } catch (e) { break }
    }
    console.log(`indexed ${store}: total ${idx.length}`)
  }
  fs.writeFileSync('scripts/catalog.json', JSON.stringify(idx))
  return idx
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error('img HTTP ' + res.status)
  const buf = Buffer.from(await res.arrayBuffer())
  const meta = await sharp(buf).metadata()
  if (!meta.width || meta.width < 250) throw new Error('low-res')
  return await sharp(buf).resize(600, 600, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 82 }).toBuffer()
}

async function run() {
  const list = JSON.parse(fs.readFileSync('scripts/needimg.json', 'utf8'))
  const idx = await buildIndex()
  console.log('catalog size:', idx.length)
  buildIdf(idx)
  let ok = 0
  const matched = [], unmatched = []
  for (let i = 0; i < list.length; i++) {
    const { slug } = list[i]
    const nt = toks(slug.replace(/-/g, ' '))
    let best = null, bestScore = 0
    for (const e of idx) {
      const sc = scoreToks(nt, e.toks)
      if (sc > bestScore) { bestScore = sc; best = e }
    }
    if (!best || bestScore < THRESHOLD) {
      unmatched.push({ slug, bestScore: +bestScore.toFixed(2), title: best && best.title })
      console.log(`[${i + 1}/${list.length}] NO MATCH ${slug} (best="${best && best.title}" ${bestScore.toFixed(2)})`)
      continue
    }
    try {
      const out = await download(best.img)
      fs.writeFileSync(path.join(OUT, slug + '.jpg'), out)
      ok++
      matched.push({ slug, title: best.title, score: +bestScore.toFixed(2) })
      console.log(`[${i + 1}/${list.length}] OK ${slug} <= "${best.title}" (${bestScore.toFixed(2)})`)
    } catch (e) {
      unmatched.push({ slug, err: e.message, title: best.title })
      console.log(`[${i + 1}/${list.length}] DL FAIL ${slug} :: ${e.message}`)
    }
  }
  fs.writeFileSync('scripts/shop-matched.json', JSON.stringify(matched, null, 2))
  fs.writeFileSync('scripts/shop-unmatched.json', JSON.stringify(unmatched, null, 2))
  console.log(`\nDONE ok=${ok} unmatched=${unmatched.length}`)
}
run()
