const fs = require('fs')
const txt = fs.readFileSync('src/data/products.ts', 'utf8')
function slug(n) { return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
const re = /name: '((?:[^'\\]|\\.)*)'/g
let m, miss = 0, n = 0, ph = 0
while ((m = re.exec(txt))) {
  n++
  const f = 'public/images/products/' + slug(m[1].replace(/\\'/g, "'")) + '.jpg'
  if (!fs.existsSync(f)) { miss++; console.log('MISSING', f) }
  else if (fs.statSync(f).size === 3631) { ph++; console.log('PLACEHOLDER', f) }
}
console.log('products', n, 'missing', miss, 'placeholders', ph)
