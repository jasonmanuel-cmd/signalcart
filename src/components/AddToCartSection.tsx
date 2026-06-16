'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

export default function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  let displayPrice = product.price
  if (product.qtyPrices) {
    if (qty >= (product.boxQty || 999)) displayPrice = product.qtyPrices.box
    else if (qty >= 10) displayPrice = product.qtyPrices[10]
    else if (qty >= 5) displayPrice = product.qtyPrices[5]
    else displayPrice = product.qtyPrices[1]
  }

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, qty)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <div className="flex items-center border border-[#e5e0da] rounded-lg overflow-hidden">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-3 py-3.5 text-[#6b6560] hover:bg-[#f0ede8] transition-colors text-sm font-medium"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 py-3.5 text-sm font-semibold text-[#1a1a1a] border-x border-[#e5e0da] min-w-[40px] text-center">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="px-3 py-3.5 text-[#6b6560] hover:bg-[#f0ede8] transition-colors text-sm font-medium"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`flex-1 px-6 py-3.5 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg ${added ? 'bg-[#1b7a6e] hover:shadow-[#1b7a6e]/20' : 'bg-[#c8914a] hover:bg-[#b8803a] hover:shadow-[#c8914a]/20'}`}
      >
        {added ? 'Added!' : `Add to Cart — $${displayPrice.toFixed(2)}`}
      </button>
      <button
        onClick={handleBuyNow}
        className="px-6 py-3.5 border border-[#e5e0da] text-[#1a1a1a] text-sm font-semibold rounded-lg hover:bg-[#f0ede8] text-center transition-all"
      >
        Buy Now
      </button>
    </div>
  )
}
