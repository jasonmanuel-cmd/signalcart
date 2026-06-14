import { NextResponse } from 'next/server'
import { getProducts, saveProduct } from '@/lib/admin/store'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json({ products })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const product = await saveProduct(data)
    return NextResponse.json({ product, success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
