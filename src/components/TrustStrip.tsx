export default function TrustStrip() {
  const items = [
    { label: 'Nationwide Shipping', sub: '2–8 business days', icon: '🚚' },
    { label: 'Free over $75', sub: 'No code needed', icon: '📦' },
    { label: 'Secure Checkout', sub: 'Square encrypted payments', icon: '🔒' },
    { label: 'Curated Selection', sub: 'Vetted & reliable', icon: '✓' },
  ]

  return (
    <div className="bg-white border-b border-[#e5e0da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 shrink-0">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-[#1a1a1a] whitespace-nowrap">{item.label}</p>
                <p className="text-[10px] text-[#9c958e] whitespace-nowrap">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
