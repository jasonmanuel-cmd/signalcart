const fs = require('fs')
const txt = fs.readFileSync('src/data/products.ts', 'utf8')
function slug(n) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
// A file is a real downloaded photo only if it's AVIF (magic: "....ftyp" with "avif").
// Everything else (the generated 600x600 "SIGNAL CART" sample JPEGs, or missing) needs fetching.
function isRealPhoto(file) {
  let fd
  try {
    fd = fs.openSync(file, 'r')
  } catch (e) {
    return false
  }
  const buf = Buffer.alloc(32)
  fs.readSync(fd, buf, 0, 32, 0)
  fs.closeSync(fd)
  return buf.includes(Buffer.from('ftyp')) && buf.includes(Buffer.from('avif'))
}
const re = /name: '((?:[^'\\]|\\.)*)'[\s\S]*?sourceUrl: '([^']*)'/g
let m
const arr = []
while ((m = re.exec(txt))) {
  arr.push({ name: m[1].replace(/\\'/g, "'"), url: m[2] })
}
console.log('parsed', arr.length)
const ph = []
for (const p of arr) {
  const f = 'public/images/products/' + slug(p.name) + '.jpg'
  if (!isRealPhoto(f)) ph.push({ slug: slug(p.name), url: p.url })
}
console.log('need images:', ph.length)
fs.writeFileSync('scripts/needimg.json', JSON.stringify(ph, null, 2))
console.log(ph.slice(0, 3))
