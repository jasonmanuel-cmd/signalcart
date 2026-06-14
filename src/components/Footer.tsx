import Link from 'next/link'
import Image from 'next/image'
import { siteConfig, navLinks } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/headerlogo.png"
                alt={siteConfig.name}
                width={100}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm max-w-md leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-white/5 rounded flex items-center justify-center px-1">
                <svg viewBox="0 0 50 20" className="h-4 w-auto fill-white/40"><rect width="50" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5"/><text x="25" y="14" textAnchor="middle" fontSize="8" fill="currentColor">Square</text></svg>
              </div>
              <div className="w-10 h-7 bg-white/5 rounded flex items-center justify-center px-1">
                <svg viewBox="0 0 50 20" className="h-4 w-auto fill-white/40"><rect width="50" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5"/><text x="25" y="14" textAnchor="middle" fontSize="7" fill="currentColor">Visa</text></svg>
              </div>
              <div className="w-10 h-7 bg-white/5 rounded flex items-center justify-center px-1">
                <svg viewBox="0 0 50 20" className="h-4 w-auto fill-white/40"><rect width="50" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5"/><text x="25" y="14" textAnchor="middle" fontSize="7" fill="currentColor">MC</text></svg>
              </div>
              <div className="w-10 h-7 bg-white/5 rounded flex items-center justify-center px-1">
                <svg viewBox="0 0 50 20" className="h-4 w-auto fill-white/40"><rect width="50" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5"/><text x="25" y="14" textAnchor="middle" fontSize="6" fill="currentColor">Amex</text></svg>
              </div>
              <div className="w-10 h-7 bg-white/5 rounded flex items-center justify-center px-1">
                <svg viewBox="0 0 50 20" className="h-4 w-auto fill-white/40"><rect width="50" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5"/><text x="25" y="14" textAnchor="middle" fontSize="5" fill="currentColor">Apple Pay</text></svg>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/50 text-sm hover:text-white/80 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Policies</h4>
            <div className="flex flex-col gap-2">
              <Link href="/policies/delivery" className="text-white/50 text-sm hover:text-white/80 transition-colors">Delivery</Link>
              <Link href="/policies/returns" className="text-white/50 text-sm hover:text-white/80 transition-colors">Returns</Link>
              <Link href="/policies/privacy" className="text-white/50 text-sm hover:text-white/80 transition-colors">Privacy</Link>
              <Link href="/policies/terms" className="text-white/50 text-sm hover:text-white/80 transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-white/30 text-xs">Secured by Square — {siteConfig.city}, {siteConfig.state}</p>
        </div>
      </div>
    </footer>
  )
}
