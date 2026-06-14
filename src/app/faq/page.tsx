import { Metadata } from 'next'
import { siteConfig } from '@/data/site'
import FAQAccordion from '@/components/FAQAccordion'
import { faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.name}`,
  description: `Frequently asked questions about Signal Cart — ordering, shipping, and more.`,
}

const allFAQs = [
  { question: 'How does Signal Cart work?', answer: 'Browse our catalog, add items to your cart, and checkout. We ship nationwide from Bakersfield, CA. Every order includes tracking and arrives in discreet packaging.' },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 5–8 business days. Expedited shipping takes 2–3 business days. We ship via USPS, UPS, and FedEx.' },
  { question: 'Do you ship to all 50 states?', answer: 'Yes, we ship to all 50 US states. Some products may have state-specific restrictions — we verify compliance before every shipment.' },
  { question: 'Is shipping really free over $75?', answer: 'Yes. Orders over $75 ship free via standard shipping. No coupon code needed.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit and debit cards, Apple Pay, and Google Pay through our secure Square-powered checkout.' },
  { question: 'Do you require age verification?', answer: 'Yes. Age verification is required for certain products. We comply with all applicable federal and state laws.' },
  { question: 'Can I cancel or modify my order?', answer: 'Contact us as soon as possible. If the order has not shipped yet, we can modify or cancel it.' },
  { question: 'What is your return policy?', answer: 'We accept returns on unopened items within 14 days of delivery. See our Returns policy page for full details.' },
  { question: 'Do you offer bulk pricing?', answer: 'Some products are available in bulk quantities. Contact us for bulk order inquiries.' },
  { question: 'Is Signal Cart a physical store?', answer: 'Signal Cart is an online retailer operating from Bakersfield, CA. We ship nationwide — there is no physical storefront for walk-in shopping.' },
]

export default function FAQPage() {
  const faqJsonLd = faqSchema(allFAQs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">FAQ</span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-4">Frequently Asked Questions</h1>
        <p className="text-[#6b6560] mb-10">Answers to the most common questions about Signal Cart, ordering, and shipping.</p>
        <div className="bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8">
          <FAQAccordion items={allFAQs} />
        </div>
      </div>
    </>
  )
}
