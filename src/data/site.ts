import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Signal Cart',
  domain: 'signalcart.shop',
  tagline: 'Curated local access. Fast.',
  description: 'Signal Cart connects you to curated products available for fast local pickup and delivery in Bakersfield. Organized. Reliable. Nearby.',
  email: 'hello@signalcart.shop',
  phone: '(661) 000-0000',
  address: 'Bakersfield, CA',
  city: 'Bakersfield',
  state: 'CA',
  zip: '93301',
  social: {
    instagram: 'https://instagram.com/signalcart',
  },
}

export const locations = [
  {
    slug: 'bakersfield',
    name: 'Bakersfield',
    state: 'California',
    deliveryRadius: '15 miles',
    pickupAvailable: true,
    deliveryAvailable: true,
    hours: 'Mon–Sat 10am–8pm, Sun 11am–6pm',
  },
]

export const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/location/bakersfield', label: 'Bakersfield' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
