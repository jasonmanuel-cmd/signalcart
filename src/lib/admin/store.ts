import { Product } from '@/types'

const PRODUCTS_BLOB_KEY = 'signalcart-products.json'

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function readBlobJson(): Promise<Product[]> {
  try {
    const { list, get } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: PRODUCTS_BLOB_KEY })
    if (blobs.length === 0) return []
    const result = await get(blobs[0].url, { access: 'public' })
    if (!result || !result.stream) return []
    const reader = result.stream.getReader()
    const decoder = new TextDecoder()
    let text = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
    return JSON.parse(text)
  } catch (e) {
    console.log('Blob read skipped (first build or no blob configured):', (e as Error)?.message)
    return []
  }
}

export async function getProducts(): Promise<Product[]> {
  const { products: staticProducts } = await import('@/data/products')
  let overrides: Product[] = []
  try {
    overrides = await readBlobJson()
  } catch {}

  const staticMap = new Map(staticProducts.map((p) => [p.slug, p]))
  const overrideMap = new Map(overrides.map((p) => [p.slug, p]))
  const merged = [...staticMap.entries()].map(([slug, p]) => overrideMap.get(slug) || p)
  const newSlugs = overrides.filter((p) => !staticMap.has(p.slug))
  return [...merged, ...newSlugs]
}

export async function saveProduct(product: Omit<Product, 'slug' | 'id'> & { slug?: string; id?: string }): Promise<Product> {
  const all = await getProducts()
  const newSlug = product.slug || slug(product.name)
  const newId = product.id || `admin-${Date.now()}`
  const existing = all.find((p) => p.slug === newSlug)
  const updated: Product = {
    ...product as Product,
    slug: newSlug,
    id: existing?.id || newId,
    shortDescription: product.shortDescription || product.name,
    description: product.description || product.name,
    wholesalePrice: product.wholesalePrice || Math.round(product.price / 1.5 * 100) / 100,
    tags: product.tags || [],
  }
  const filtered = all.filter((p) => p.slug !== newSlug)
  filtered.push(updated)
  await persistProducts(filtered)
  return updated
}

export async function deleteProduct(slug: string): Promise<void> {
  const all = await getProducts()
  const filtered = all.filter((p) => p.slug !== slug)
  await persistProducts(filtered)
}

async function persistProducts(products: Product[]): Promise<void> {
  try {
    const { put } = await import('@vercel/blob')
    await put(PRODUCTS_BLOB_KEY, JSON.stringify(products, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    })
  } catch (e) {
    console.error('Failed to persist products:', e)
  }
}

export async function uploadImage(file: File): Promise<string> {
  try {
    const { put } = await import('@vercel/blob')
    const ext = file.name.split('.').pop() || 'jpg'
    const key = `products/${Date.now()}.${ext}`
    const blob = await put(key, file, { access: 'public' })
    return blob.url
  } catch {
    return '/images/products/placeholder.jpg'
  }
}
