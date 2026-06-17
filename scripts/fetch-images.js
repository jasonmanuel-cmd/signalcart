// Scrapes the real product image from each 4aces product page and saves it
// over the placeholder in public/images/products/<slug>.jpg
const fs = require('fs')
const path = require('path')

const list = JSON.parse(fs.readFileSync('scripts/needimg.json', 'utf8'))
const OUT = 'public/images/products'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

async function getImageUrl(pageUrl) {
  const res = await fetch(pageUrl, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('page HTTP ' + res.status)
  const html = await res.text()
  // Prefer the JSON-LD / og "image" field, fall back to wp-post-image src
  let m = html.match(/"image":"(https:\/\/[^"]+?\.(?:avif|jpe?g|png|webp))"/i)
  if (!m) m = html.match(/property="og:image"\s+content="([^"]+)"/i)
  if (!m) m = html.match(/wp-post-image[^>]*?(?:data-src|src)="([^"]+)"/i)
  if (!m) return null
  return m[1].replace(/\\\//g, '/')
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('img HTTP ' + res.status)
  return Buffer.from(await res.arrayBuffer())
}

async function run() {
  let ok = 0, fail = 0
  const failures = []
  for (let i = 0; i < list.length; i++) {
    const { slug, url } = list[i]
    try {
      const imgUrl = await getImageUrl(url)
      if (!imgUrl) throw new Error('no image found on page')
      const buf = await download(imgUrl)
      if (buf.length < 1500) throw new Error('image too small (' + buf.length + ')')
      fs.writeFileSync(path.join(OUT, slug + '.jpg'), buf)
      ok++
      console.log(`[${i + 1}/${list.length}] OK ${slug} (${buf.length}b)`)
    } catch (e) {
      fail++
      failures.push({ slug, url, err: e.message })
      console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  fs.writeFileSync('scripts/fetch-failures.json', JSON.stringify(failures, null, 2))
  console.log(`\nDONE  ok=${ok} fail=${fail}`)
}
run()
