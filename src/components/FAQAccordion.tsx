'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQAccordion({ items, title }: { items: FAQItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <div>
      {title && <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <span>{item.question}</span>
              <svg
                className={`w-4 h-4 text-white/40 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
