import json, re

# Read JSON with images and prices
with open('C:/Users/blunt/Desktop/apps/Signalcart/products_data.json', 'r') as f:
    products = json.load(f)

# Read original products.ts from git for category info
import subprocess
original = subprocess.run(
    ['git', 'show', 'HEAD:src/data/products.ts'],
    capture_output=True, text=True, cwd='C:/Users/blunt/Desktop/apps/Signalcart'
).stdout

# Parse original: get category + tags by sourceUrl slug
orig_lines = original.split('\n')
orig_data = {}
for line in orig_lines:
    m = re.search(r"id: '(p\d+)', name: '([^']+)', price: [\d.]+, categorySlug: '([^']+)', categoryName: '([^']+)', stockType: '([^']+)', complianceBucket: '([^']+)', featured: (true|false), bestseller: (true|false), tags: \[([^\]]*)\], sourceUrl: '([^']+)'", line)
    if m:
        slug = m.group(10).rstrip('/').split('/')[-1]
        orig_data[slug] = {
            'id': m.group(1),
            'categorySlug': m.group(3),
            'categoryName': m.group(4),
            'tags': m.group(9),
            'featured': m.group(7),
            'bestseller': m.group(8),
        }

# Build new products.ts
out = []
out.append("import { Product } from '@/types'")
out.append("")
out.append("function slug(name: string): string {")
out.append("  return name")
out.append("    .toLowerCase()")
out.append("    .replace(/[^a-z0-9]+/g, '-')")
out.append("    .replace(/(^-|-$)/g, '')")
out.append("}")
out.append("")
out.append("function desc(name: string): string {")
out.append("  return `${name} — available now through Signal Cart with nationwide shipping. Fast and discreet delivery across the United States.`")
out.append("}")
out.append("")
out.append("const raw: Omit<Product, 'slug' | 'shortDescription' | 'description' | 'wholesalePrice' | 'compareAtPrice' | 'imageUrl'>[] = [")

for p in products:
    name = p['product_name'].replace("'", "\\'")
    price = p['our_price']
    image = p['image']
    url = p['url']
    url_slug = url.rstrip('/').split('/')[-1]

    od = orig_data.get(url_slug, None)
    if od:
        pid = od['id']
        cat_slug = od['categorySlug']
        cat_name = od['categoryName']
        tags = od['tags']
        featured = od['featured']
        bestseller = od['bestseller']
    else:
        pid = 'p000'
        cat_slug = 'miscellaneous'
        cat_name = 'Miscellaneous'
        tags = ''
        featured = 'false'
        bestseller = 'false'

    entry = f"  {{ id: '{pid}', name: '{name}', price: {price}, categorySlug: '{cat_slug}', categoryName: '{cat_name}', stockType: 'source', complianceBucket: 'safe', featured: {featured}, bestseller: {bestseller}, tags: [{tags}], sourceUrl: '{url}', imageUrl: '{image}' }},"
    out.append(entry)

out.append("];")
out.append("")
out.append("export const products: Product[] = raw.map((item) => ({")
out.append("  ...item,")
out.append("  slug: slug(item.name),")
out.append("  shortDescription: desc(item.name),")
out.append("  description: desc(item.name),")
out.append("  wholesalePrice: item.price,")
out.append("  compareAtPrice: Math.round(item.price * 1.3 * 100) / 100,")
out.append("  imageUrl: item.imageUrl || '/images/products/placeholder.jpg',")
out.append("  stock: 999,")
out.append("  inStock: true,")
out.append("  rating: 4.5,")
out.append("  reviewCount: 0,")
out.append("}));")
out.append("")

with open('C:/Users/blunt/Desktop/apps/Signalcart/src/data/products.ts', 'w') as f:
    f.write('\n'.join(out))

print("Done. Verifying first entry...")
with open('C:/Users/blunt/Desktop/apps/Signalcart/src/data/products.ts', 'r') as f:
    content = f.read()
# Show p001 line
for line in content.split('\n'):
    if "id: 'p001'" in line:
        print(line[:200])
        break
