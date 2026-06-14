const trustItems = [
  { icon: '⚡', label: 'Local pickup in hours', desc: 'Order by 4pm, ready same day' },
  { icon: '🎯', label: 'Curated selection', desc: 'Every item hand-selected for quality' },
  { icon: '🔒', label: 'Secure checkout', desc: 'Protected payments & privacy' },
  { icon: '📦', label: 'Local delivery', desc: 'Bakersfield area, fast & friendly' },
]

export default function TrustStrip() {
  return (
    <section className="py-10 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <h3 className="text-white text-sm font-semibold">{item.label}</h3>
              <p className="text-white/40 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
