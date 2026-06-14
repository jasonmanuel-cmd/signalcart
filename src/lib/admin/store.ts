import { Product } from '@/types'
import fs from 'fs'
import path from 'path'

const ADMIN_DATA_DIR = path.join(process.cwd(), 'src', 'data')
const ADMIN_FILE = path.join(ADMIN_DATA_DIR, 'admin-products.json')

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function readAdminProducts(): Product[] {
  try {
    if (fs.existsSync(ADMIN_FILE)) {
      return JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

function writeAdminProducts(products: Product[]) {
  try {
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(products, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to persist admin products:', e)
  }
}

export async function getProducts(): Promise<Product[]> {
  const { products: staticProducts } = await import('@/data/products')
  const adminProducts = readAdminProducts()

  const staticMap = new Map(staticProducts.map((p) => [p.slug, p]))
  const adminMap = new Map(adminProducts.map((p) => [p.slug, p]))
  const merged = [...staticMap.entries()].map(([slug, p]) => adminMap.get(slug) || p)
  const newFromAdmin = adminProducts.filter((p) => !staticMap.has(p.slug))
  return [...merged, ...newFromAdmin]
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
  writeAdminProducts(filtered)
  return updated
}

export async function deleteProduct(slug: string): Promise<void> {
  const all = await getProducts()
  const filtered = all.filter((p) => p.slug !== slug)
  writeAdminProducts(filtered)
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg'
  const fileName = `${Date.now()}.${ext}`
  const publicDir = path.join(process.cwd(), 'public', 'images', 'products')

  try {
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(path.join(publicDir, fileName), buffer)
    return `/images/products/${fileName}`
  } catch {
    return '/images/products/placeholder.jpg'
  }
}
