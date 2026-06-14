import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: `Get in touch with Signal Cart in Bakersfield. Questions about products, pickup, or delivery? We are here to help.`,
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h1>
      <p className="text-white/50 mb-10">Questions about a product, pickup, or delivery? Reach out and we will get back to you fast.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">Email</h3>
          <a href={`mailto:${siteConfig.email}`} className="text-[#2d8c7f] text-sm hover:underline">{siteConfig.email}</a>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">Location</h3>
          <p className="text-white/50 text-sm">{siteConfig.city}, {siteConfig.state}</p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
          <input type="email" placeholder="Your email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
        </div>
        <textarea rows={4} placeholder="Your message" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2d8c7f]/50" />
        <button type="submit" className="px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors">
          Send Message
        </button>
      </form>
    </div>
  )
}
