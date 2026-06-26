// Source real product photos from web image search for products 4aces doesn't
// carry. Saves the first valid image per product; montages built separately.
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const list = JSON.parse(fs.readFileSync('scripts/needimg.json', 'utf8'))
const OUT = 'public/images/products'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
const BAD = ['wixmp.com', 'deviantart', 'lookaside', 'fbsbx', 'video', '.svg']

function queryFor(slug) {
  // Drop trailing size/count noise that hurts image search, keep brand + type.
  return slug.replace(/-/g, ' ') + ' product'
}

async function searchImages(q) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1`
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('search HTTP ' + res.status)
  const html = await res.text()
  const urls = [...html.matchAll(/murl&quot;:&quot;(.*?)&quot;/g)]
    .map((m) => m[1].replace(/&amp;/g, '&'))
  return urls.filter((u) => /^https?:\/\//.test(u) && !BAD.some((b) => u.toLowerCase().includes(b)))
}

async function tryDownload(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error('img HTTP ' + res.status)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 6000) throw new Error('too small')
  // Validate + normalize to a square-ish 600px webp so the grid is consistent.
  const meta = await sharp(buf).metadata()
  if (!meta.width || meta.width < 250 || meta.height < 250) throw new Error('low-res')
  return await sharp(buf).resize(600, 600, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 82 }).toBuffer()
}

async function run() {
  let ok = 0
  const failed = []
  for (let i = 0; i < list.length; i++) {
    const { slug } = list[i]
    let done = false
    try {
      const urls = await searchImages(queryFor(slug))
      for (const u of urls.slice(0, 6)) {
        try {
          const out = await tryDownload(u)
          fs.writeFileSync(path.join(OUT, slug + '.jpg'), out)
          ok++; done = true
          console.log(`[${i + 1}/${list.length}] OK ${slug} (${out.length}b)`)
          break
        } catch (e) { /* try next url */ }
      }
      if (!done) { failed.push(slug); console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: no usable image`) }
    } catch (e) {
      failed.push(slug); console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  fs.writeFileSync('scripts/web-failed.json', JSON.stringify(failed, null, 2))
  console.log(`\nDONE ok=${ok} failed=${failed.length}`)
}
run()
