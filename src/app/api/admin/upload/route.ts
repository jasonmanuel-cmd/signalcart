import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/admin/store'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    const url = await uploadImage(file)
    return NextResponse.json({ url, success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
