export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice: number | null
  wholesalePrice: number
  categorySlug: string
  categoryName: string
  imageUrl: string
  stockType: 'local' | 'source' | 'low'
  complianceBucket: 'safe' | 'gray'
  featured: boolean
  bestseller: boolean
  tags: string[]
  sourceUrl: string
  qtyPrices?: { 1: number; 5: number; 10: number; box: number }
  boxQty?: number
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  heroCopy: string
  imageUrl: string
  parentSlug: string | null
  displayOrder: number
  productCount: number
  seoTitle: string
  metaDescription: string
  faqBlock: { question: string; answer: string }[]
}

export interface CartItem {
  productSlug: string
  quantity: number
}

export interface Location {
  slug: string
  name: string
  state: string
  deliveryRadius: string
  pickupAvailable: boolean
  deliveryAvailable: boolean
  hours: string
}

export interface SiteConfig {
  name: string
  domain: string
  tagline: string
  description: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  social: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
}
