// Re-fetches the REAL product image for each duplicate-group product from its
// 4aces product page, overwriting the shared/duplicate image.
// Targets come from scripts/_dupfix.json ({slug,url}); url is derived when blank.
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const list = JSON.parse(fs.readFileSync('scripts/_dupfix.json', 'utf8'))
const OUT = 'public/images/products'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
const BASE = 'https://4aceswholesale.com/product/'

function md5(buf) { return crypto.createHash('md5').update(buf).digest('hex') }

async function getImageUrl(pageUrl) {
  const res = await fetch(pageUrl, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  if (!res.ok) throw new Error('page HTTP ' + res.status)
  const html = await res.text()
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
  let ok = 0, fail = 0, unchanged = 0
  const failures = []
  for (let i = 0; i < list.length; i++) {
    const { slug } = list[i]
    const url = list[i].url || (BASE + slug + '/')
    const dest = path.join(OUT, slug + '.jpg')
    const before = fs.existsSync(dest) ? md5(fs.readFileSync(dest)) : ''
    try {
      const imgUrl = await getImageUrl(url)
      if (!imgUrl) throw new Error('no image found on page')
      const buf = await download(imgUrl)
      if (buf.length < 1500) throw new Error('image too small (' + buf.length + ')')
      const after = md5(buf)
      fs.writeFileSync(dest, buf)
      if (after === before) { unchanged++; console.log(`[${i + 1}/${list.length}] SAME ${slug} (real img matched existing)`) }
      else { ok++; console.log(`[${i + 1}/${list.length}] NEW  ${slug} (${buf.length}b)`) }
    } catch (e) {
      fail++
      failures.push({ slug, url, err: e.message })
      console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  fs.writeFileSync('scripts/refetch-dup-failures.json', JSON.stringify(failures, null, 2))
  console.log(`\nDONE  new=${ok}  same=${unchanged}  fail=${fail}`)
}
run()
