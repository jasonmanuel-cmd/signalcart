import { Product, Category, SiteConfig } from '@/types'

export function productSchema(product: Product, site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.id,
    mpn: product.id,
    image: `https://${site.domain}${product.imageUrl}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stockType === 'source'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/LimitedAvailability',
      url: `https://${site.domain}/shop/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    category: product.categoryName,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function organizationSchema(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: `https://${site.domain}`,
    logo: `https://${site.domain}/signalcartmainlogo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'US',
    },
  }
}

export function localBusinessSchema(site: SiteConfig, location: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    image: `https://${site.domain}/signalcartmainlogo.png`,
    url: `https://${site.domain}`,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressRegion: site.state,
      addressCountry: 'US',
    },
    priceRange: '$$',
    areaServed: location,
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
