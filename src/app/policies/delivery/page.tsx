import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Delivery Policy | ${siteConfig.name}`,
  description: `Signal Cart delivery policy for the Bakersfield area. Local delivery within 15 miles.`,
}

export default function DeliveryPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-white mb-6">Delivery Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/50 space-y-4">
        <p>Signal Cart provides local delivery and pickup services in the Bakersfield, California area.</p>
        <h3 className="text-white font-semibold">Delivery Area</h3>
        <p>We deliver within a 15-mile radius of central Bakersfield. Enter your zip code at checkout to confirm availability.</p>
        <h3 className="text-white font-semibold">Delivery Times</h3>
        <p>Delivery is available during operating hours (Mon–Sat 10am–8pm, Sun 11am–6pm). Most delivery orders are fulfilled within 1–3 hours of placement.</p>
        <h3 className="text-white font-semibold">Pickup</h3>
        <p>Same-day pickup is available for most in-stock items. You will receive a text message when your order is ready, typically within 1–2 hours.</p>
        <h3 className="text-white font-semibold">Age Verification</h3>
        <p>Valid ID required for age-restricted items at pickup or delivery.</p>
      </div>
    </div>
  )
}
