'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { shippingConfig } from '@/data/site'
import SquarePaymentForm from '@/components/SquarePaymentForm'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'expedited'>('standard')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState('')

  const shipping = subtotal >= shippingConfig.freeThreshold || subtotal === 0 ? 0
    : shippingMethod === 'expedited' ? shippingConfig.expeditedRate : 0

  const total = subtotal + shipping

  const handleSuccess = (result: any) => {
    setOrderPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <svg className="w-16 h-16 mx-auto text-[#d4cfc8] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <p className="text-[#6b6560] mb-6">Your cart is empty.</p>
        <Link href="/shop" className="inline-flex px-6 py-3 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all">
          Start Shopping
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <div className="w-16 h-16 mx-auto bg-[#e8f5f3] rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#1b7a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2">Order Placed!</h1>
        <p className="text-[#6b6560] mb-8">Thank you for your order. You will receive a confirmation email shortly.</p>
        <Link href="/shop" className="inline-flex px-6 py-3 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all">
          Continue Shopping
        </Link>
      </div>
    )
  }

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
                <span className="text-sm font-semibold text-[#1a1a1a]">
                  {subtotal >= shippingConfig.freeThreshold ? 'FREE' : `$${shippingConfig.standardRate.toFixed(2)}`}
                </span>
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
            <SquarePaymentForm amount={total} onSuccess={handleSuccess} onError={setError} />
            {error && (
              <p className="mt-2 text-xs text-[#c44a4a]">{error}</p>
            )}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#e5e0da]">
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Visa</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">MC</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Amex</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">Apple Pay</span></div>
              <div className="w-10 h-6 bg-[#f0ede8] rounded flex items-center justify-center"><span className="text-[#9c958e] text-[8px]">GPay</span></div>
            </div>
          </div>

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
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.slug} className="flex items-start gap-3 text-sm">
                  <div className="w-10 h-10 rounded bg-[#f0ede8] shrink-0 flex items-center justify-center">
                    <span className="text-[9px] text-[#9c958e] font-medium">{item.quantity}x</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1a1a1a] font-medium truncate">{item.product.name}</p>
                    <p className="text-[#9c958e] text-xs">${item.price.toFixed(2)} each</p>
                  </div>
                  <span className="text-[#1a1a1a] font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e0da] space-y-2 text-sm">
              <div className="flex justify-between text-[#6b6560]">
                <span>Subtotal</span>
                <span className="text-[#1a1a1a]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b6560]">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-[#1b7a6e] font-medium' : 'text-[#1a1a1a]'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[#1a1a1a] font-semibold pt-2 border-t border-[#e5e0da]">
                <span>Total</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
