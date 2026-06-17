// For products with no sourceUrl: search 4aces by name, pick the best-matching
// product via token overlap on the result slug, then download its image.
const fs = require('fs')
const path = require('path')

const list = JSON.parse(fs.readFileSync('scripts/needimg.json', 'utf8'))
const OUT = 'public/images/products'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
const THRESHOLD = 0.6

// Brand/keyword tokens carry the most signal; drop generic filler + pure counts.
const STOP = new Set(['the', 'and', 'with', 'pack', 'box', 'ct', 'pc', 'pcs', 'piece',
  'pieces', 'single', 'assortment', 'assorted', 'organic', 'natural', 'premium', 'count'])

function tokens(s) {
  return s.toLowerCase()
    .replace(/["'".]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((t) => t && t.length > 1 && !STOP.has(t) && !/^\d+ct$/.test(t))
}

function score(nameToks, slug) {
  // Bidirectional Jaccard: penalizes candidates that carry EXTRA distinctive
  // tokens (a different product), not just ones missing our tokens.
  const a = new Set(nameToks)
  const b = new Set(tokens(slug.replace(/-/g, ' ')))
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const t of a) if (b.has(t)) inter++
  return inter / (a.size + b.size - inter)
}

async function search(name) {
  // 4aces returns nothing for long exact names; query the top significant tokens.
  const q = encodeURIComponent(tokens(name).slice(0, 4).join(' '))
  const url = `https://4aceswholesale.com/?s=${q}&post_type=product`
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('search HTTP ' + res.status)
  const html = await res.text()
  const slugs = [...html.matchAll(/https:\/\/4aceswholesale\.com\/product\/([a-z0-9-]+)\//g)]
    .map((m) => m[1])
  return [...new Set(slugs)]
}

async function getImageUrl(slug) {
  const res = await fetch(`https://4aceswholesale.com/product/${slug}/`,
    { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('page HTTP ' + res.status)
  const html = await res.text()
  let m = html.match(/"image":"(https:\/\/[^"]+?\.(?:avif|jpe?g|png|webp))"/i)
  if (!m) m = html.match(/property="og:image"\s+content="([^"]+)"/i)
  if (!m) m = html.match(/wp-post-image[^>]*?(?:data-src|src)="([^"]+)"/i)
  return m ? m[1].replace(/\\\//g, '/') : null
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('img HTTP ' + res.status)
  return Buffer.from(await res.arrayBuffer())
}

async function run() {
  let ok = 0
  const unmatched = []
  const matchedLog = []
  for (let i = 0; i < list.length; i++) {
    const { slug } = list[i]
    const name = slug.replace(/-/g, ' ')
    try {
      const nameToks = tokens(name)
      const results = await search(name)
      let best = null, bestScore = 0
      for (const r of results) {
        const sc = score(nameToks, r)
        if (sc > bestScore) { bestScore = sc; best = r }
      }
      if (!best || bestScore < THRESHOLD) {
        unmatched.push({ slug, bestScore: +bestScore.toFixed(2), best })
        console.log(`[${i + 1}/${list.length}] NO MATCH ${slug} (best=${best || '-'} ${bestScore.toFixed(2)})`)
      } else {
        const imgUrl = await getImageUrl(best)
        if (!imgUrl) throw new Error('no image on ' + best)
        const buf = await download(imgUrl)
        if (buf.length < 1500) throw new Error('image too small')
        fs.writeFileSync(path.join(OUT, slug + '.jpg'), buf)
        ok++
        matchedLog.push({ slug, matched: best, score: +bestScore.toFixed(2) })
        console.log(`[${i + 1}/${list.length}] OK ${slug} <= ${best} (${bestScore.toFixed(2)}, ${buf.length}b)`)
      }
    } catch (e) {
      unmatched.push({ slug, err: e.message })
      console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  fs.writeFileSync('scripts/search-unmatched.json', JSON.stringify(unmatched, null, 2))
  fs.writeFileSync('scripts/search-matched.json', JSON.stringify(matchedLog, null, 2))
  console.log(`\nDONE ok=${ok} unmatched=${unmatched.length}`)
}
run()
