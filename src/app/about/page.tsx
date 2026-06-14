import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `Signal Cart is your local-access retail system in Bakersfield. Curated products, fast pickup, organized delivery.`,
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">About Signal Cart</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
        <p className="text-lg text-white/70 leading-relaxed">
          Signal Cart was built on a simple idea: local access should not be a mess.
        </p>
        <p>
          Most retail experiences are organized for the seller, not the buyer. Categories that make no sense. 
          Inventory that is unclear. Delivery that takes a week. We do the opposite.
        </p>
        <p>
          We curate products that are actually useful, organize them by how people actually shop, 
          and make them available for fast local pickup and delivery in Bakersfield, California.
        </p>
        <p>
          We are not a warehouse. We are a local-access system — connecting you to the best products nearby, 
          without the clutter, confusion, or wait.
        </p>
        <h2 className="text-white font-semibold text-xl mt-10">Why &ldquo;Signal Cart&rdquo;?</h2>
        <p>
          Signal represents clarity, direction, and intelligence. Cart represents commerce, action, 
          and movement. Together: smart commerce that moves fast. That is the entire philosophy.
        </p>
        <h2 className="text-white font-semibold text-xl mt-10">The COAI Connection</h2>
        <p>
          Signal Cart is part of the Chaotically Organized AI (COAI) ecosystem — applying systems thinking, 
          structured design, and operational clarity to local commerce. We do not just sell products. 
          We organize access.
        </p>
      </div>
    </div>
  )
}
