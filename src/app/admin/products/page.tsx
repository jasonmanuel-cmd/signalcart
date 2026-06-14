'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setProducts(data.products || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' })
    load()
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <AdminNavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors"
          >
            Add Product
          </Link>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm mb-6 focus:outline-none focus:border-[#2d8c7f]/50"
        />
        {loading ? (
          <p className="text-white/40 text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/40 text-sm">No products found.</p>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => (
              <div key={p.slug} className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-white/5 rounded flex-shrink-0 overflow-hidden">
                    {p.imageUrl && !p.imageUrl.includes('placeholder') ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">img</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{p.name}</p>
                    <p className="text-white/30 text-xs">{p.categoryName} · ${p.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded ${p.stockType === 'local' ? 'bg-green-900/30 text-green-400' : p.stockType === 'low' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-white/5 text-white/40'}`}>
                    {p.stockType}
                  </span>
                  <Link
                    href={`/admin/products/${p.slug}/edit`}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 text-xs rounded hover:bg-white/10 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.slug, p.name)}
                    className="px-3 py-1.5 bg-red-900/20 border border-red-900/30 text-red-400 text-xs rounded hover:bg-red-900/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AdminNavBar() {
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
