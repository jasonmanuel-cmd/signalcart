import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Returns Policy | ${siteConfig.name}`,
  description: `Signal Cart return policy. Returns accepted within 14 days on unopened items.`,
}

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-white mb-6">Returns Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/50 space-y-4">
        <p>We accept returns on unopened, unused items within 14 days of pickup or delivery.</p>
        <h3 className="text-white font-semibold">Conditions</h3>
        <ul>
          <li>Items must be unopened and in original packaging</li>
          <li>Returns must be initiated within 14 days of receipt</li>
          <li>Proof of purchase required</li>
        </ul>
        <h3 className="text-white font-semibold">Non-Returnable Items</h3>
        <p>Certain items cannot be returned due to health and safety regulations. These will be noted on the product page.</p>
        <h3 className="text-white font-semibold">Process</h3>
        <p>Contact us to initiate a return. We will provide instructions for returning the item to our Bakersfield location.</p>
      </div>
    </div>
  )
}
