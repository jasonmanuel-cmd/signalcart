import Link from 'next/link'
import Image from 'next/image'
import { siteConfig, navLinks } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/headerlogo.png"
                alt={siteConfig.name}
                width={120}
                height={34}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {['Visa', 'MC', 'Amex', 'Discover', 'Apple Pay', 'GPay'].map((p) => (
                <span key={p} className="px-2 py-1 bg-white/5 text-white/30 text-[10px] font-medium rounded border border-white/5">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/40 text-sm hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Support</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/contact" className="text-white/40 text-sm hover:text-white/70 transition-colors">Contact Us</Link>
              <Link href="/faq" className="text-white/40 text-sm hover:text-white/70 transition-colors">FAQ</Link>
              <Link href="/shipping" className="text-white/40 text-sm hover:text-white/70 transition-colors">Shipping Info</Link>
              <Link href="/policies/returns" className="text-white/40 text-sm hover:text-white/70 transition-colors">Returns</Link>
              <Link href="/policies/privacy" className="text-white/40 text-sm hover:text-white/70 transition-colors">Privacy</Link>
              <Link href="/policies/terms" className="text-white/40 text-sm hover:text-white/70 transition-colors">Terms</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Contact</h4>
            <div className="flex flex-col gap-2.5 text-white/40 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white/70 transition-colors">{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white/70 transition-colors">{siteConfig.phone}</a>
              <p>{siteConfig.city}, {siteConfig.state}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-white/20 text-xs">Ship nationwide from {siteConfig.city}, {siteConfig.state}</p>
        </div>
      </div>
    </footer>
  )
}
