const fs = require('fs')
const txt = fs.readFileSync('src/data/products.ts', 'utf8')
function slug(n) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
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
  let sz = -1
  try { sz = fs.statSync(f).size } catch (e) { sz = -2 }
  if (sz === 3631 || sz < 0) ph.push({ slug: slug(p.name), url: p.url, sz })
}
console.log('need images:', ph.length)
fs.writeFileSync('scripts/needimg.json', JSON.stringify(ph, null, 2))
console.log(ph.slice(0, 3))
