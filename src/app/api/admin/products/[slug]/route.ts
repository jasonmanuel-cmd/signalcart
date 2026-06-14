import { NextResponse } from 'next/server'
import { getProducts, saveProduct, deleteProduct } from '@/lib/admin/store'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((p) => p.slug === slug)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ product })
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await request.json()
  const product = await saveProduct({ ...data, slug })
  return NextResponse.json({ product, success: true })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await deleteProduct(slug)
  return NextResponse.json({ success: true })
}
