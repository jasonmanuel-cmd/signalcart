'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { shippingConfig } from '@/data/site'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  const shipping = subtotal >= shippingConfig.freeThreshold || subtotal === 0 ? 0 : shippingConfig.standardRate
  const total = subtotal + shipping

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Shopping Cart</span>
      <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1 mb-8">Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#e5e0da] rounded-xl">
          <svg className="w-16 h-16 mx-auto text-[#d4cfc8] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <p className="text-[#6b6560] mb-6">Your cart is empty.</p>
          <Link href="/shop" className="inline-flex px-6 py-3 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.slug} className="flex items-center gap-4 bg-white border border-[#e5e0da] rounded-xl p-4">
                <div className="w-20 h-20 rounded-lg bg-[#f0ede8] shrink-0 flex items-center justify-center overflow-hidden">
                  {item.product.imageUrl && !item.product.imageUrl.includes('placeholder') ? (
                    <Image src={item.product.imageUrl} alt={item.product.name} width={80} height={80} className="object-cover w-full h-full" />
                  ) : (
                    <svg className="w-8 h-8 text-[#d4cfc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" /><path d="M9 21V9" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.product.slug}`} className="text-sm font-semibold text-[#1a1a1a] hover:text-[#1b7a6e] truncate block transition-colors">
                    {item.product.name}
                  </Link>
                  <span className="text-xs text-[#9c958e] block mt-0.5">${item.price.toFixed(2)} each</span>
                  {item.product.qtyPrices && (
                    <span className="text-[10px] text-[#c8914a] font-medium">Bulk pricing available</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm text-[#6b6560] border border-[#e5e0da] rounded-lg hover:bg-[#f0ede8] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#1a1a1a]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm text-[#6b6560] border border-[#e5e0da] rounded-lg hover:bg-[#f0ede8] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="text-right min-w-[80px]">
                  <span className="text-sm font-bold text-[#1a1a1a]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => removeItem(item.product.slug)}
                  className="p-1.5 text-[#9c958e] hover:text-[#c44a4a] transition-colors"
                  aria-label="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white border border-[#e5e0da] rounded-xl p-6 sticky top-24">
              <h3 className="text-[#1a1a1a] font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#6b6560]">
                  <span>Subtotal</span>
                  <span className="text-[#1a1a1a] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6b6560]">
                  <span>Shipping</span>
                  <span className={subtotal >= shippingConfig.freeThreshold || subtotal === 0 ? 'text-[#1b7a6e] font-medium' : 'text-[#1a1a1a] font-medium'}>
                    {subtotal >= shippingConfig.freeThreshold || subtotal === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < shippingConfig.freeThreshold && (
                  <p className="text-[10px] text-[#c8914a]">Add ${(shippingConfig.freeThreshold - subtotal).toFixed(2)} more for free shipping</p>
                )}
              </div>
              <div className="border-t border-[#e5e0da] mt-4 pt-4 flex items-center justify-between">
                <span className="text-[#1a1a1a] font-semibold">Total</span>
                <span className="text-[#1a1a1a] font-bold text-lg">${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block text-center mt-6 w-full px-6 py-3.5 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20"
              >
                Checkout
              </Link>
              <Link href="/shop" className="block text-center mt-3 text-xs text-[#9c958e] hover:text-[#1a1a1a] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
