'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { siteConfig } from '@/data/site'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    const qLower = q.toLowerCase()
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.tags.some((t) => t.toLowerCase().includes(qLower)) ||
        p.categoryName.toLowerCase().includes(qLower)
    )
    setResults(filtered)
    setSearched(true)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Search</span>
      <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1 mb-6">Search Products</h1>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by product name, category, or keyword..."
          className="w-full px-5 py-4 bg-white border border-[#e5e0da] rounded-xl text-[#1a1a1a] placeholder:text-[#9c958e] text-sm focus:outline-none focus:border-[#1b7a6e] focus:ring-2 focus:ring-[#1b7a6e]/10 transition-all"
          autoFocus
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c958e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {searched && (
        <p className="text-[#6b6560] text-sm mb-6">
          {results.length === 0
            ? 'No products found. Try a different search term.'
            : `${results.length} product${results.length === 1 ? '' : 's'} found`}
        </p>
      )}

      <div className="space-y-3">
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="flex items-center justify-between bg-white border border-[#e5e0da] rounded-lg p-4 hover:border-[#d4cfc8] hover:shadow-sm transition-all"
          >
            <div>
              <h3 className="text-[#1a1a1a] text-sm font-medium">{product.name}</h3>
              <span className="text-[#9c958e] text-xs">{product.categoryName}</span>
            </div>
            <span className="text-[#1a1a1a] font-semibold text-sm">{formatPrice(product.price)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
