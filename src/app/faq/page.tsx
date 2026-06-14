import { Metadata } from 'next'
import { siteConfig } from '@/data/site'
import FAQAccordion from '@/components/FAQAccordion'
import { faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.name}`,
  description: `Frequently asked questions about Signal Cart — ordering, pickup, delivery, and more in Bakersfield.`,
}

const allFAQs = [
  { question: 'How does Signal Cart work?', answer: 'Browse our catalog, add items to your cart, and choose pickup or delivery at checkout. We source locally and coordinate fast fulfillment in Bakersfield.' },
  { question: 'Is pickup really same-day?', answer: 'Most in-stock items are ready within 1–2 hours during operating hours (Mon–Sat 10am–8pm, Sun 11am–6pm). You will get a text when your order is ready.' },
  { question: 'What areas do you deliver to?', answer: 'We deliver within a 15-mile radius of central Bakersfield, CA.' },
  { question: 'What are your hours?', answer: 'Monday–Saturday 10am–8pm, Sunday 11am–6pm.' },
  { question: 'Do you require age verification?', answer: 'Valid ID required for age-restricted items. We comply with all applicable laws and regulations.' },
  { question: 'What payment methods do you accept?', answer: 'We accept major credit cards, debit cards, and digital payment methods through our secure checkout.' },
  { question: 'Can I cancel or modify my order?', answer: 'Contact us as soon as possible. If the order has not been sourced yet, we can modify or cancel it.' },
  { question: 'What is your return policy?', answer: 'We accept returns on unopened items within 14 days of pickup or delivery. See our Returns policy page for details.' },
  { question: 'Do you offer bulk pricing?', answer: 'Some products are available in bulk quantities. Contact us for bulk order inquiries.' },
  { question: 'Is Signal Cart a physical store?', answer: 'Signal Cart is a local-access retail system operating in Bakersfield. We focus on online ordering with local pickup and delivery.' },
]

export default function FAQPage() {
  const faqJsonLd = faqSchema(allFAQs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">FAQ</h1>
        <p className="text-white/50 mb-10">Answers to the most common questions about Signal Cart.</p>
        <FAQAccordion items={allFAQs} />
      </div>
    </>
  )
}
