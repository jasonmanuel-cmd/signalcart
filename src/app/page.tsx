import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import CategoryCard from '@/components/CategoryCard'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { categories } from '@/data/categories'
import { getFeaturedProducts, getNewArrivals } from '@/data/products'
import { siteConfig } from '@/data/site'
import { organizationSchema, localBusinessSchema } from '@/lib/schema'

const homepageFAQs = [
  { question: 'How does Signal Cart work?', answer: 'Browse our curated catalog, place an order, and choose pickup or local delivery in the Bakersfield area. We source items locally and coordinate fast pickup within hours.' },
  { question: 'Is pickup really same-day?', answer: 'Most in-stock items are ready for pickup within 1–2 hours during operating hours. You will receive a text confirmation when your order is ready.' },
  { question: 'What areas do you deliver to?', answer: 'We currently serve Bakersfield and the surrounding 15-mile radius. Delivery is available during operating hours.' },
  { question: 'Do you require age verification?', answer: 'Some products may require age verification at pickup. Valid ID required for age-restricted items.' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  const orgJsonLd = organizationSchema(siteConfig)
  const localJsonLd = localBusinessSchema(siteConfig, 'Bakersfield')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }}
      />

      <HeroSection />

      <TrustStrip />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
            <Link href="/categories" className="text-[#2d8c7f] text-sm font-medium hover:text-[#3aa89a] transition-colors">
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

      <section className="py-16 md:py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <Link href="/shop" className="text-[#2d8c7f] text-sm font-medium hover:text-[#3aa89a] transition-colors">
              Shop all &rarr;
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
            <Link href="/shop?sort=newest" className="text-[#2d8c7f] text-sm font-medium hover:text-[#3aa89a] transition-colors">
              View all &rarr;
            </Link>
          </div>
          <ProductGrid products={newArrivals.slice(0, 8)} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#2d8c7f] text-sm font-semibold tracking-widest uppercase">Local Access</span>
              <h2 className="text-3xl font-bold text-white mt-3">Available near you, not just online</h2>
              <p className="text-white/50 mt-4 leading-relaxed">
                Every product on Signal Cart is sourced with local access in mind. We organize the best 
                selection from Bakersfield suppliers so you can browse, buy, and pick up without the wait.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Same-day pickup in Bakersfield',
                  'Local delivery within 15 miles',
                  'Curated selection, not random inventory',
                  'Real-time availability updates',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d8c7f] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/location/bakersfield"
                className="inline-flex items-center mt-8 px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors"
              >
                Bakersfield Local Page
              </Link>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
              <h3 className="text-white font-semibold text-lg">Frequently Asked</h3>
              <FAQAccordion items={homepageFAQs} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
