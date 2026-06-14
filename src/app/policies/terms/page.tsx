import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Signal Cart terms and conditions.`,
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/50 space-y-4">
        <p>By using Signal Cart, you agree to these terms.</p>
        <h3 className="text-white font-semibold">General</h3>
        <p>Signal Cart provides a local-access retail platform connecting customers with curated products available for pickup or delivery in the Bakersfield, CA area.</p>
        <h3 className="text-white font-semibold">Product Availability</h3>
        <p>Product availability is subject to change. We make every effort to keep inventory accurate but cannot guarantee all items are always available.</p>
        <h3 className="text-white font-semibold">Pricing</h3>
        <p>All prices are in USD and subject to change. Price at time of order is the price charged.</p>
        <h3 className="text-white font-semibold">Age Restrictions</h3>
        <p>Customers must comply with all applicable age restrictions. Valid ID may be required at pickup or delivery for age-restricted items.</p>
        <h3 className="text-white font-semibold">Limitation of Liability</h3>
        <p>Signal Cart acts as a local fulfillment coordinator. We are not responsible for manufacturer defects or issues beyond our direct control.</p>
      </div>
    </div>
  )
}
