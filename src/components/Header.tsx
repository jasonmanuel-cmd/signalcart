'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig, navLinks } from '@/data/site'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e0da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/signalcartmainlogo.png"
              alt={siteConfig.name}
              width={36}
              height={36}
              className="w-8 h-8 md:w-9 md:h-9"
            />
            <span className="text-lg font-bold text-[#1a1a1a] tracking-tight hidden sm:block">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#6b6560] hover:text-[#1a1a1a] rounded-lg hover:bg-[#f0ede8] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:inline-flex px-5 py-2.5 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20"
            >
              Shop Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#6b6560] hover:text-[#1a1a1a]"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#e5e0da] py-4 pb-6 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-[#6b6560] hover:text-[#1a1a1a] rounded-lg hover:bg-[#f0ede8] transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-5 py-3 bg-[#c8914a] text-white text-sm font-semibold rounded-lg text-center hover:bg-[#b8803a] transition-all"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
