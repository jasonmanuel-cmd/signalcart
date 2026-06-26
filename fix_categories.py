import re, subprocess

# Read current products.ts
with open('src/data/products.ts', 'r') as f:
    content = f.read()

# Get original from git
try:
    original = subprocess.run(
        ['git', 'show', 'HEAD:src/data/products.ts'],
        capture_output=True, text=True, cwd='.'
    ).stdout
except:
    original = None

if not original:
    print("No git history available")
    exit(1)

# Parse original to get categories by URL slug
orig_entries = re.findall(
    r"id: '(p\d+)', name: '([^']+)', price: [\d.]+, categorySlug: '([^']+)', categoryName: '([^']+)', stockType: '([^']+)', complianceBucket: '([^']+)', featured: (true|false), bestseller: (true|false), tags: \[([^\]]*)\], sourceUrl: '([^']+)'",
    original
)

cats_by_url = {}
for e in orig_entries:
    slug = e[9].rstrip('/').split('/')[-1]
    cats_by_url[slug] = {
        'id': e[0],
        'categorySlug': e[2],
        'categoryName': e[3],
        'featured': e[7],
        'bestseller': e[8],
        'tags': e[9],
    }

print(f"Parsed {len(cats_by_url)} entries from original")

# Parse current entries
current_pattern = r"\{ id: '(p\d+)', name: '([^']+)', price: ([\d.]+), categorySlug: '([^']+)', categoryName: '([^']+)', stockType: '([^']+)', complianceBucket: '([^']+)', featured: (true|false), bestseller: (true|false), tags: \[([^\]]*)\], sourceUrl: '([^']+)', imageUrl: '([^']+)' \}"

current_entries = re.findall(current_pattern, content)
print(f"Found {len(current_entries)} current entries")

replacements = 0
for entry in current_entries:
    pid, name, price, cat_slug, cat_name, stock, compliance, featured, bestseller, tags, url, image = entry
    url_slug = url.rstrip('/').split('/')[-1]

    if url_slug in cats_by_url:
        cat = cats_by_url[url_slug]
        old_str = f"{{ id: '{pid}', name: '{name}', price: {price}, categorySlug: '{cat_slug}', categoryName: '{cat_name}', stockType: '{stock}', complianceBucket: '{compliance}', featured: {featured}, bestseller: {bestseller}, tags: [{tags}], sourceUrl: '{url}', imageUrl: '{image}' }}"
        new_str = f"{{ id: '{pid}', name: '{name}', price: {price}, categorySlug: '{cat['categorySlug']}', categoryName: '{cat['categoryName']}', stockType: '{stock}', complianceBucket: '{compliance}', featured: {cat['featured']}, bestseller: {cat['bestseller']}, tags: [{cat['tags']}], sourceUrl: '{url}', imageUrl: '{image}' }}"
        if old_str != new_str:
            content = content.replace(old_str, new_str)
            replacements += 1

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print(f"Updated {replacements} product categories")

# Show sample
sample = re.findall(r"id: 'p001'[^}]+\}", content)[0]
print(f"\nSample p001: {sample[:150]}")
