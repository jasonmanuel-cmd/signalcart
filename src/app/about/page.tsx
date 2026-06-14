import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `Signal Cart — premium smoking accessories and organizational tools shipped nationwide.`,
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">About</span>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6">About Signal Cart</h1>
      <div className="text-[#6b6560] text-sm space-y-6 leading-relaxed">
        <p className="text-lg text-[#1a1a1a]/80 leading-relaxed font-medium">
          Signal Cart was built on a simple idea: quality products should be easy to get, anywhere in the US.
        </p>
        <p>
          We curate a selection of premium smoking accessories and organizational tools — everything from glassware and rolling supplies to storage solutions and accessories. Every product is vetted for quality and reliability.
        </p>
        <p>
          We ship nationwide from our facility in Bakersfield, California. Whether you are in Los Angeles, New York, Austin, or anywhere in between, your order arrives quickly and discreetly.
        </p>
        <p>
          We are not a warehouse. We are a curated-access system — connecting you to the best products, without the clutter, confusion, or wait.
        </p>
        <h2 className="text-[#1a1a1a] font-semibold text-xl mt-10">Why &ldquo;Signal Cart&rdquo;?</h2>
        <p>
          Signal represents clarity, direction, and intelligence. Cart represents commerce, action, and movement. Together: smart commerce that moves fast. That is the entire philosophy.
        </p>
        <h2 className="text-[#1a1a1a] font-semibold text-xl mt-10">Our Commitment</h2>
        <p>
          We are committed to reliable nationwide shipping, secure checkout via Square, and products that meet our quality standards. Every order ships with tracking and arrives in discreet packaging.
        </p>
      </div>
    </div>
  )
}
