import { Metadata } from 'next'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Signal Cart privacy policy. How we handle your data.`,
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/50 space-y-4">
        <p>Your privacy matters. Here is how Signal Cart handles your information.</p>
        <h3 className="text-white font-semibold">What We Collect</h3>
        <p>We collect only the information needed to process your order: name, email, phone number, delivery address, and payment details. We also collect basic analytics (pages visited, products viewed) to improve your experience.</p>
        <h3 className="text-white font-semibold">How We Use It</h3>
        <p>Order fulfillment, customer service, order updates (SMS/email), and site improvement. We never sell your data.</p>
        <h3 className="text-white font-semibold">Payment Security</h3>
        <p>All payments are processed through secure, PCI-compliant payment gateways. We do not store full credit card numbers.</p>
        <h3 className="text-white font-semibold">Contact</h3>
        <p>For privacy-related questions: {siteConfig.email}</p>
      </div>
    </div>
  )
}
