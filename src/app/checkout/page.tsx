'use client'

import { useState } from 'react'
import Link from 'next/link'
import { shippingConfig } from '@/data/site'

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'expedited'>('standard')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Checkout</span>
      <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
            <h2 className="text-[#1a1a1a] font-semibold mb-4">Contact</h2>
            <input type="email" placeholder="Email address" className="input-field" />
          </div>

          <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
            <h2 className="text-[#1a1a1a] font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Full name" className="input-field" />
              <input type="text" placeholder="Street address" className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" className="input-field" />
                <input type="text" placeholder="State" className="input-field" />
              </div>
              <input type="text" placeholder="ZIP code" className="input-field" />
            </div>
          </div>

          <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
            <h2 className="text-[#1a1a1a] font-semibold mb-4">Shipping Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-[#1b7a6e] bg-[#e8f5f3]' : 'border-[#e5e0da] hover:border-[#d4cfc8]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-[#1b7a6e]" />
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">Standard Shipping</p>
                    <p className="text-xs text-[#6b6560]">{shippingConfig.standardDays} business days</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1a1a1a]">FREE</span>
              </label>
              <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === 'expedited' ? 'border-[#1b7a6e] bg-[#e8f5f3]' : 'border-[#e5e0da] hover:border-[#d4cfc8]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" checked={shippingMethod === 'expedited'} onChange={() => setShippingMethod('expedited')} className="accent-[#1b7a6e]" />
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">Expedited Shipping</p>
                    <p className="text-xs text-[#6b6560]">{shippingConfig.expeditedDays} business days</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1a1a1a]">${shippingConfig.expeditedRate.toFixed(2)}</span>
              </label>
            </div>
          </div>

          <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#1a1a1a] font-semibold">Payment</h2>
              <span className="px-2 py-0.5 bg-[#e8f5f3] text-[#1b7a6e] text-xs font-medium rounded">Secured by Square</span>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Card number" className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM / YY" className="input-field" />
                <input type="text" placeholder="CVC" className="input-field" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#e5e0da]">
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Visa</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">MC</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Amex</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Apple Pay</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">GPay</span></div>
            </div>
          </div>

          <button className="w-full px-6 py-4 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20">
            Place Order
          </button>

          <p className="text-[#9c958e] text-xs text-center">
            By placing this order, you agree to our{' '}
            <Link href="/policies/terms" className="text-[#6b6560] underline hover:text-[#1a1a1a]">Terms</Link>
            {' '}and{' '}
            <Link href="/policies/privacy" className="text-[#6b6560] underline hover:text-[#1a1a1a]">Privacy Policy</Link>.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-[#e5e0da] rounded-xl p-6 sticky top-24">
            <h3 className="text-[#1a1a1a] font-semibold mb-4">Order Summary</h3>
            <p className="text-[#9c958e] text-xs">Items will appear here once added to cart.</p>
            <div className="mt-6 pt-4 border-t border-[#e5e0da] space-y-2 text-sm">
              <div className="flex justify-between text-[#6b6560]">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-[#6b6560]">
                <span>Shipping</span>
                <span className="text-[#1b7a6e] font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-[#1a1a1a] font-semibold pt-2 border-t border-[#e5e0da]">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
