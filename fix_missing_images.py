import csv, os, re, urllib.request, brotli, gzip, time

missing_slugs = [
    '100ct-5ml-silicone-wax-container-assortment',
    '100ct-6ml-silicone-lid-concentrate-drip-jar',
    '100ct-6ml-silicone-lid-no-neck-glass-jar',
    '12ct-aluminum-aviator-sunglasses-with-spring-hinge-ram26',
    '12ct-aluminum-aviator-sunglasses-with-spring-hinge',
    '12ct-king-striker-sport-sunglasses-kss10',
    '12ct-king-striker-sport-sunglasses-kss12',
    '12ct-ladies-dazey-shades-fashion-eyewear-ds462',
    '12ct-ladies-dazey-shades-fashion-eyewear-ds496',
    '12ct-ladies-dazey-shades-fashion-eyewear-ds497',
    '12ct-ladies-fashion-sunglasses-nf05',
    '12ct-polarized-aluminum-aviator-sunglasses-arampol4',
    '12ct-polarized-sport-sunglasses-sptpol92',
    '12ct-sport-wrap-sunglasses-spt76',
    '12ct-sport-wrap-sunglasses-spt82',
    '12ct-sports-wrap-shield-sunglasses',
    '20ct-hamburger-silicone-stash-jar',
    '23-tall-standing-high-floor-ashtray',
    '25ct-honeybee-hunny-pot-silicone-stash-jar',
    '25ct-mushroom-silicone-stash-jar-assortment',
    '50ct-cactus-silicone-stash-jar',
    '5ml-silicone-stash-jar-assortment-100pk',
    'chromium-crusher-funnel-grinder-6pk-78mm',
    'fire-chief-kitchen-matches-case',
    'honeypuff-grinder-multi-cone-filler-king-size',
    'pokeball-grinder-6pk',
    'simpsons-rubiks-cube-zinc-grinders-6pk',
    'ufo-90ml-glass-jar-container',
]

# Read CSV to get URLs
products = {}
with open('4aces_safe_retail.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        slug = row['url'].rstrip('/').split('/')[-1]
        products[slug] = row['url']

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
}

success = 0
for slug in missing_slugs:
    url = products.get(slug, f'https://4aceswholesale.com/product/{slug}/')
    try:
        req = urllib.request.Request(url, headers=headers)
        resp = urllib.request.urlopen(req, timeout=15)
        data = resp.read()
        ce = resp.headers.get('Content-Encoding', '')
        if ce == 'br': data = brotli.decompress(data)
        elif ce == 'gzip': data = gzip.decompress(data)
        html = data.decode('utf-8', errors='ignore')
        
        imgs = re.findall(r'https://4aceswholesale\.com/wp-content/uploads/[^\"\'\s<>]+\.(?:avif|jpg|png|webp)', html)
        product_imgs = [img for img in imgs if 'Logo' not in img and 'cropped' not in img and '4use' not in img and '-100x100' not in img and '-150x150' not in img and '-360x360' not in img]
        
        if product_imgs:
            img_url = product_imgs[0]
            ext = img_url.split('.')[-1]
            img_req = urllib.request.Request(img_url, headers={'User-Agent': headers['User-Agent']})
            img_resp = urllib.request.urlopen(img_req, timeout=15)
            img_data = img_resp.read()
            filepath = f'public/images/products/{slug}.{ext}'
            with open(filepath, 'wb') as f:
                f.write(img_data)
            print(f'OK {slug[:50]}')
            success += 1
        else:
            print(f'NO IMG {slug[:50]}')
    except Exception as e:
        print(f'ERR {slug[:40]} {str(e)[:40]}')
    time.sleep(0.3)

print(f'\nDownloaded {success}/{len(missing_slugs)} missing images')
