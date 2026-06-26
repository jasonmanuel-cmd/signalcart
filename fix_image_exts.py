import re, os

with open('src/data/products.ts', 'r') as f:
    content = f.read()

# For each imageUrl, check if .avif exists, if not try .jpg, .png, .webp
def replace_image_url(match):
    url = match.group(1)
    for ext in ['.avif', '.jpg', '.png', '.webp']:
        path = f'public{url.rsplit(".", 1)[0]}{ext}'
        if os.path.exists(path):
            new_url = url.rsplit('.', 1)[0] + ext
            return f"imageUrl: '{new_url}'"
    return match.group(0)  # keep original if nothing found

content = re.sub(r"imageUrl: '([^']+)'", replace_image_url, content)

with open('src/data/products.ts', 'w') as f:
    f.write(content)

# Verify
urls = re.findall(r"imageUrl: '([^']+)'", content)
missing = 0
for url in urls:
    path = f'public{url}'
    if not os.path.exists(path):
        print(f'STILL MISSING: {path}')
        missing += 1

print(f'\nFinal: {len(urls) - missing}/{len(urls)} images present')
