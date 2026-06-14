'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { Product } from '@/types'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    price: '',
    compareAtPrice: '',
    categorySlug: '',
    shortDescription: '',
    description: '',
    stockType: 'source',
    featured: false,
    bestseller: false,
    imageUrl: '/images/products/placeholder.jpg',
  })

  useEffect(() => {
    fetch(`/api/admin/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        const p = data.product as Product
        if (p) {
          setForm({
            name: p.name,
            price: String(p.price),
            compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : '',
            categorySlug: p.categorySlug,
            shortDescription: p.shortDescription || '',
            description: p.description || '',
            stockType: p.stockType,
            featured: p.featured,
            bestseller: p.bestseller,
            imageUrl: p.imageUrl || '/images/products/placeholder.jpg',
          })
        }
        setLoading(false)
      })
  }, [slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const body = new FormData()
    body.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body })
    const data = await res.json()
    if (data.url) setForm((f) => ({ ...f, imageUrl: data.url }))
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const price = parseFloat(form.price)
    const compareAtPrice = form.compareAtPrice ? parseFloat(form.compareAtPrice) : null
    const cat = categories.find((c) => c.slug === form.categorySlug)

    const res = await fetch(`/api/admin/products/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        price,
        compareAtPrice,
        wholesalePrice: Math.round(price / 1.5 * 100) / 100,
        categorySlug: form.categorySlug,
        categoryName: cat?.name || form.categorySlug,
        shortDescription: form.shortDescription || form.name,
        description: form.description || form.name,
        stockType: form.stockType,
        complianceBucket: 'safe',
        featured: form.featured,
        bestseller: form.bestseller,
        tags: [],
        imageUrl: form.imageUrl,
      }),
    })

    if (res.ok) router.push('/admin/products')
    setSaving(false)
  }

  if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center"><p className="text-white/40 text-sm">Loading...</p></div>

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <AdminNav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Edit: {form.name}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Price ($) *</label>
              <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Compare At ($)</label>
              <input name="compareAtPrice" type="number" step="0.01" value={form.compareAtPrice} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
            </div>
          </div>
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Category *</label>
            <select name="categorySlug" value={form.categorySlug} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50">
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Short Description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
          </div>
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Full Description</label>
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
          </div>
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Stock Type</label>
            <select name="stockType" value={form.stockType} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50">
              <option value="local">Local — In Stock</option>
              <option value="source">Source — Order In</option>
              <option value="low">Low — Limited Stock</option>
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                {form.imageUrl && !form.imageUrl.includes('placeholder') ? (
                  <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm mb-2 focus:outline-none focus:border-[#2d8c7f]/50"
                />
                <label className="inline-flex px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-xs rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-[#2d8c7f]" />
              <span className="text-white/70 text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} className="accent-[#2d8c7f]" />
              <span className="text-white/70 text-sm">Bestseller</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/products" className="px-6 py-3 bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg hover:bg-white/10 transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

function AdminNav() {
  return (
    <div className="border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-white font-semibold text-sm">Signal Cart Admin</Link>
          <Link href="/admin/products" className="text-[#2d8c7f] text-sm">Products</Link>
        </div>
        <Link href="/" className="text-white/30 hover:text-white/50 text-xs transition-colors">View Site</Link>
      </div>
    </div>
  )
}
