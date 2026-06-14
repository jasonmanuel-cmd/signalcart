import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: `Get in touch with Signal Cart. Questions about products, shipping, or orders? We are here to help.`,
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Contact</span>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 mb-4">Get in Touch</h1>
      <p className="text-[#6b6560] mb-10">Questions about a product, order, or shipping? Reach out and we will get back to you fast.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
          <h3 className="text-[#1a1a1a] font-semibold mb-1">Email</h3>
          <a href={`mailto:${siteConfig.email}`} className="text-[#1b7a6e] text-sm hover:underline">{siteConfig.email}</a>
        </div>
        <div className="bg-white border border-[#e5e0da] rounded-xl p-6">
          <h3 className="text-[#1a1a1a] font-semibold mb-1">Location</h3>
          <p className="text-[#6b6560] text-sm">{siteConfig.city}, {siteConfig.state}</p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your name" className="input-field" />
          <input type="email" placeholder="Your email" className="input-field" />
        </div>
        <textarea rows={4} placeholder="Your message" className="input-field" />
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>
    </div>
  )
}
