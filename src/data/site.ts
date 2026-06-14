import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Signal Cart',
  domain: 'signalcart.shop',
  tagline: 'Curated essentials. Shipped nationwide.',
  description: 'Premium smoking accessories and organizational tools delivered across the United States. Curated selection, reliable shipping, trusted service.',
  email: 'hello@signalcart.shop',
  phone: '(661) 000-0000',
  address: 'Bakersfield, CA 93301',
  city: 'Bakersfield',
  state: 'CA',
  zip: '93301',
  social: {
    instagram: 'https://instagram.com/signalcart',
  },
}

export const shippingConfig = {
  freeThreshold: 75,
  standardRate: 5.99,
  standardDays: '5–8',
  expeditedRate: 12.99,
  expeditedDays: '2–3',
  carriers: ['USPS', 'UPS', 'FedEx'],
  originZip: '93301',
}

export const navLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/categories', label: 'Categories' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
