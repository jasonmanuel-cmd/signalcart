'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const demoItems = products.slice(0, 2)

  const subtotal = demoItems.reduce((sum, p) => sum + p.price * (quantities[p.id] || 1), 0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-2xl font-bold text-white mb-8">Cart</h1>

      {demoItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/50 mb-4">Your cart is empty.</p>
          <Link href="/shop" className="inline-flex px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {demoItems.map((product) => (
              <div key={product.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" /><path d="M9 21V9" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${product.slug}`} className="text-white text-sm font-medium hover:underline truncate block">
                    {product.name}
                  </Link>
                  <span className="text-white/40 text-xs">{product.categoryName}</span>
                </div>
                <span className="text-white font-semibold text-sm">{formatPrice(product.price)}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 h-fit">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/50">Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/50">Pickup/Delivery</span>
              <span className="text-white">Calculated at next step</span>
            </div>
            <div className="border-t border-white/5 mt-4 pt-4 flex items-center justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-white font-bold">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="block text-center mt-6 w-full px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
