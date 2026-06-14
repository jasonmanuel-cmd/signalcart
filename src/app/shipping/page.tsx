import { Metadata } from 'next'
import { siteConfig, shippingConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Shipping | ${siteConfig.name}`,
  description: `Nationwide shipping from Signal Cart. Free shipping over $${shippingConfig.freeThreshold}. Standard and expedited options available.`,
}

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Shipping</span>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6">Shipping Information</h1>

      <div className="space-y-10">
        <div className="bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">Shipping Options</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e0da]">
              <div>
                <p className="font-medium text-[#1a1a1a] text-sm">Standard Shipping</p>
                <p className="text-xs text-[#6b6560] mt-0.5">Delivers in {shippingConfig.standardDays} business days</p>
              </div>
              <span className="text-sm font-semibold text-[#1a1a1a]">
                {shippingConfig.standardRate === 0 ? 'FREE' : `$${shippingConfig.standardRate.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1a1a1a] text-sm">Expedited Shipping</p>
                <p className="text-xs text-[#6b6560] mt-0.5">Delivers in {shippingConfig.expeditedDays} business days</p>
              </div>
              <span className="text-sm font-semibold text-[#1a1a1a]">${shippingConfig.expeditedRate.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Free Shipping</h2>
          <p className="text-sm text-[#6b6560] leading-relaxed">
            Orders over ${shippingConfig.freeThreshold} ship free via standard shipping. No code needed — it is automatically applied at checkout.
          </p>
        </div>

        <div className="bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Carriers</h2>
          <p className="text-sm text-[#6b6560] leading-relaxed">
            We ship via {shippingConfig.carriers.slice(0, -1).join(', ')} and {shippingConfig.carriers.slice(-1)}. Tracking is included on every order.
          </p>
        </div>

        <div className="bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Shipping Policy</h2>
          <ul className="text-sm text-[#6b6560] space-y-2 leading-relaxed">
            <li>Orders are processed within 1 business day of placement.</li>
            <li>Shipping times begin after processing, not after order placement.</li>
            <li>We ship to all 50 US states and US territories.</li>
            <li>All shipments include tracking via email.</li>
            <li>Discreet, secure packaging on every order.</li>
            <li>We are not responsible for delays caused by the carrier or weather.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
