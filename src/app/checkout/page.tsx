'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [pickupOrDelivery, setPickupOrDelivery] = useState<'pickup' | 'delivery'>('pickup')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Contact</h2>
            <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Fulfillment</h2>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setPickupOrDelivery('pickup')}
                className={`flex-1 px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${pickupOrDelivery === 'pickup' ? 'bg-[#2d8c7f]/10 border-[#2d8c7f] text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}
              >
                Pickup — Bakersfield
              </button>
              <button
                onClick={() => setPickupOrDelivery('delivery')}
                className={`flex-1 px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${pickupOrDelivery === 'delivery' ? 'bg-[#2d8c7f]/10 border-[#2d8c7f] text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}
              >
                Delivery — Local
              </button>
            </div>
            {pickupOrDelivery === 'delivery' && (
              <input type="text" placeholder="Street address, Bakersfield area" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
            )}
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Payment</h2>
              <span className="px-2 py-0.5 bg-[#2d8c7f]/10 text-[#2d8c7f] text-xs font-medium rounded">Secured by Square</span>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Card number" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM / YY" className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
                <input type="text" placeholder="CVC" className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
              <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center"><span className="text-white/30 text-[8px]">Visa</span></div>
              <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center"><span className="text-white/30 text-[8px]">MC</span></div>
              <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center"><span className="text-white/30 text-[8px]">Amex</span></div>
              <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center"><span className="text-white/30 text-[8px]">Apple Pay</span></div>
              <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center"><span className="text-white/30 text-[8px]">GPay</span></div>
            </div>
          </div>

          <button className="w-full px-6 py-4 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors">
            Place Order
          </button>

          <p className="text-white/30 text-xs text-center">
            By placing this order, you agree to our{' '}
            <Link href="/policies/terms" className="text-white/50 underline hover:text-white/70">Terms</Link>
            {' '}and{' '}
            <Link href="/policies/privacy" className="text-white/50 underline hover:text-white/70">Privacy Policy</Link>.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 sticky top-24">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <p className="text-white/40 text-xs">Items will appear here once added to cart.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
