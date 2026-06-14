import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/data/site'
import { categories } from '@/data/categories'
import { getProductsByCategory, getFeaturedProducts } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'
import FAQAccordion from '@/components/FAQAccordion'
import { localBusinessSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `Bakersfield Local Pickup & Delivery | ${siteConfig.name}`,
  description: `Shop curated products for same-day pickup and fast delivery in Bakersfield, CA. Signal Cart organizes local access to the products you need, nearby and ready.`,
  openGraph: {
    title: `Signal Cart — Bakersfield Local Access`,
    description: `Curated products available for same-day pickup and delivery in Bakersfield, CA.`,
  },
}

const bakersfieldFAQs = [
  { question: 'How does pickup work in Bakersfield?', answer: 'Place your order online, select "Pickup" at checkout, and we will text you when your order is ready — typically within 1–2 hours.' },
  { question: 'What is the delivery radius?', answer: 'We deliver within a 15-mile radius of central Bakersfield. Enter your zip code at checkout to confirm.' },
  { question: 'What are your hours?', answer: 'Monday–Saturday 10am–8pm, Sunday 11am–6pm. Pickup and delivery available during operating hours.' },
  { question: 'Is age verification required?', answer: 'Valid ID required for age-restricted items. We comply with all local regulations.' },
]

export default function BakersfieldPage() {
  const localJsonLd = localBusinessSchema(siteConfig, 'Bakersfield')
  const faqJsonLd = faqSchema(bakersfieldFAQs)
  const localCategories = categories.filter(c => c.displayOrder > 0).sort((a, b) => a.displayOrder - b.displayOrder)
  const featured = getFeaturedProducts()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#2d8c7f]/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <span className="text-[#2d8c7f] text-sm font-semibold tracking-widest uppercase">Bakersfield, CA</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 max-w-2xl">
            Local access.{' '}
            <span className="text-[#2d8c7f]">Nearby and fast.</span>
          </h1>
          <p className="text-white/50 text-lg mt-4 max-w-xl leading-relaxed">
            Same-day pickup and fast delivery in Bakersfield. Signal Cart is your local-access retail system 
            for curated products — organized, reliable, and available when you need them.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/shop" className="px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors">
              Shop All Products
            </Link>
            <a href="#faq" className="px-6 py-3 border border-white/10 text-white/80 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors">
              Local FAQ
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#2d8c7f]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#2d8c7f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Same-Day Pickup</h3>
              <p className="text-white/40 text-sm mt-2">Order by 4pm and pick up within hours. We text you when it is ready.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#2d8c7f]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#2d8c7f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Local Delivery</h3>
              <p className="text-white/40 text-sm mt-2">Fast delivery within 15 miles of Bakersfield. Enter your zip at checkout.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#2d8c7f]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#2d8c7f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Curated Selection</h3>
              <p className="text-white/40 text-sm mt-2">Every product is selected for quality, not just dumped into inventory.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Categories Available in Bakersfield</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {localCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="block bg-white/[0.02] border border-white/5 rounded-lg p-5 hover:border-[#2d8c7f]/30 hover:bg-white/[0.04] transition-all"
              >
                <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                <p className="text-white/40 text-xs mt-1 line-clamp-2">{cat.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={featured} title="Featured in Bakersfield" />
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Bakersfield Local FAQ</h2>
          <FAQAccordion items={bakersfieldFAQs} />
        </div>
      </section>
    </>
  )
}
