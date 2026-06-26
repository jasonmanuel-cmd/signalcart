// Generates clean e-commerce product images for items that have no real photo
// available (see scripts/_genimg.json). Saves to public/images/products/<slug>.jpg
//
// Requires an OpenAI key with image access. Add to .env.local:
//   OPENAI_API_KEY=sk-...
// Then run:  node scripts/gen-images.js
//
// Uses gpt-image-1 (1024x1024). No npm install needed (plain fetch).
const fs = require('fs')
const path = require('path')

// Load OPENAI_API_KEY from env or .env.local
let KEY = process.env.OPENAI_API_KEY
if (!KEY && fs.existsSync('.env.local')) {
  const m = fs.readFileSync('.env.local', 'utf8').match(/^OPENAI_API_KEY=(.+)$/m)
  if (m) KEY = m[1].trim().replace(/^["']|["']$/g, '')
}
if (!KEY) {
  console.error('Missing OPENAI_API_KEY. Add it to .env.local then re-run.')
  process.exit(1)
}

const list = JSON.parse(fs.readFileSync('scripts/_genimg.json', 'utf8'))
const OUT = 'public/images/products'

function prompt(name) {
  return `Professional e-commerce product photograph of "${name}". ` +
    `Single product centered on a clean pure-white seamless studio background, ` +
    `soft even lighting, sharp focus, subtle reflection, no text overlays, ` +
    `no watermark, no people, catalog style, high detail, photorealistic.`
}

async function generate(name) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-1', prompt: prompt(name), size: '1024x1024', n: 1 }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error((json.error && json.error.message) || ('HTTP ' + res.status))
  const b64 = json.data && json.data[0] && json.data[0].b64_json
  if (!b64) throw new Error('no image in response')
  return Buffer.from(b64, 'base64')
}

async function run() {
  let ok = 0, fail = 0
  const failures = []
  for (let i = 0; i < list.length; i++) {
    const { slug, name } = list[i]
    try {
      const buf = await generate(name)
      fs.writeFileSync(path.join(OUT, slug + '.jpg'), buf)
      ok++
      console.log(`[${i + 1}/${list.length}] GEN  ${slug} (${buf.length}b)`)
    } catch (e) {
      fail++
      failures.push({ slug, err: e.message })
      console.log(`[${i + 1}/${list.length}] FAIL ${slug} :: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  if (failures.length) fs.writeFileSync('scripts/gen-failures.json', JSON.stringify(failures, null, 2))
  console.log(`\nDONE  generated=${ok}  fail=${fail}`)
}
run()
