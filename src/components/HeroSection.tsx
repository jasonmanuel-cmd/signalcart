import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/data/brand'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#2d8c7f]/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#2d8c7f] text-sm font-semibold tracking-widest uppercase mb-4">
              Bakersfield — Local & Fast
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Curated products.{' '}
              <span className="text-[#2d8c7f]">Nearby and ready.</span>
            </h1>
            <p className="text-white/50 text-lg mt-6 max-w-lg leading-relaxed">
              {brand.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/location/bakersfield"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-white/80 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
              >
                Bakersfield Pickup
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
              <div className="text-white/40 text-xs">
                <span className="text-white font-semibold text-sm">128+</span><br />Products
              </div>
              <div className="text-white/40 text-xs">
                <span className="text-white font-semibold text-sm">Local</span><br />Pickup
              </div>
              <div className="text-white/40 text-xs">
                <span className="text-white font-semibold text-sm">Curated</span><br />Selection
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-[#2d8c7f]/10 blur-3xl" />
              <Image
                src="/signalcartmainlogo.png"
                alt="Signal Cart"
                width={320}
                height={320}
                className="relative object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
