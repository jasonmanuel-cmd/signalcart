'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/categories'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const price = parseFloat(form.price)
    const compareAtPrice = form.compareAtPrice ? parseFloat(form.compareAtPrice) : null
    const cat = categories.find((c) => c.slug === form.categorySlug)

    const res = await fetch('/api/admin/products', {
      method: 'POST',
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

    if (res.ok) {
      router.push('/admin/products')
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <AdminNav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Add Product</h1>
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
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#2d8c7f]/50" />
            <p className="text-white/20 text-xs mt-1">Paste a URL or upload via the media manager later.</p>
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
              {saving ? 'Saving...' : 'Save Product'}
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
