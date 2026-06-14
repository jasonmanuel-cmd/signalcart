import Link from 'next/link'
import { siteConfig } from '@/data/site'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#1e2a28] to-[#1b7a6e]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full border border-white/10 mb-6">
            Nationwide shipping — free over $75
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Curated essentials,<br />
            <span className="text-[#c8914a]">shipped nationwide</span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-8">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#c8914a] text-white font-semibold text-sm rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-xl hover:shadow-[#c8914a]/20"
            >
              Browse Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link
              href="/shipping"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 text-white/70 font-medium text-sm rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
