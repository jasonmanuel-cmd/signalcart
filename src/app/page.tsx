import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import CategoryCard from '@/components/CategoryCard'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { categories } from '@/data/categories'
import { getFeaturedProducts, getNewArrivals } from '@/data/products'
import { siteConfig } from '@/data/site'

const homepageFAQs = [
  { question: 'How does Signal Cart work?', answer: 'Browse our curated catalog, place an order, and we ship across the US. We source quality products and coordinate fast fulfillment from Bakersfield, CA.' },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 5–8 business days. Expedited options ship in 2–3 days. We ship nationwide from California.' },
  { question: 'Do you ship to my state?', answer: 'We ship to all 50 US states. Some products may have state-specific restrictions — we verify compliance before every shipment.' },
  { question: 'What is your return policy?', answer: 'We accept returns within 14 days of delivery. Items must be unopened and in original packaging. See our returns page for details.' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.name,
            url: `https://${siteConfig.domain}`,
            description: siteConfig.description,
            contactPoint: { '@type': 'ContactPoint', email: siteConfig.email, contactType: 'customer service' },
          })
        }}
      />

      <HeroSection />
      <TrustStrip />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Categories</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2">Shop by Category</h2>
            </div>
            <Link href="/categories" className="text-[#1b7a6e] text-sm font-medium hover:text-[#145c52] transition-colors">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(c => c.displayOrder > 0).sort((a, b) => a.displayOrder - b.displayOrder).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f0ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Featured</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2">Featured Products</h2>
            </div>
            <Link href="/shop" className="text-[#1b7a6e] text-sm font-medium hover:text-[#145c52] transition-colors">
              Shop all &rarr;
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">New</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2">New Arrivals</h2>
            </div>
            <Link href="/shop?sort=newest" className="text-[#1b7a6e] text-sm font-medium hover:text-[#145c52] transition-colors">
              View all &rarr;
            </Link>
          </div>
          <ProductGrid products={newArrivals.slice(0, 8)} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f0ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Shipping</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2">Fast, reliable shipping across the US</h2>
              <p className="text-[#6b6560] mt-4 leading-relaxed">
                Every order is packed with care and shipped from our facility in Bakersfield, CA. 
                We partner with USPS, UPS, and FedEx to get your order to you quickly and reliably.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Free shipping on orders over $75',
                  'Standard (5–8 days) or expedited (2–3 days)',
                  'Tracked shipping on every order',
                  'Discreet, secure packaging',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#6b6560] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b7a6e] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/shipping"
                className="inline-flex items-center mt-8 px-6 py-3 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all"
              >
                Shipping Details
              </Link>
            </div>
            <div className="bg-white border border-[#e5e0da] rounded-xl p-8">
              <h3 className="text-[#1a1a1a] font-semibold text-lg mb-1">Frequently Asked</h3>
              <p className="text-[#6b6560] text-sm mb-4">Quick answers to common questions</p>
              <FAQAccordion items={homepageFAQs} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
