import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import { siteConfig } from '@/data/site'
import { formatPrice } from '@/lib/utils'
import { productSchema, breadcrumbSchema } from '@/lib/schema'
import ProductGrid from '@/components/ProductGrid'
import FAQAccordion from '@/components/FAQAccordion'

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  const productJsonLd = productSchema(product, siteConfig)
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', url: `https://${siteConfig.domain}/` },
    { name: 'Shop', url: `https://${siteConfig.domain}/shop` },
    { name: product.categoryName, url: `https://${siteConfig.domain}/categories/${product.categorySlug}` },
    { name: product.name, url: `https://${siteConfig.domain}/shop/${product.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white/60 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-white/60 transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-white/50 truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div className="aspect-square bg-[#f5f3ee]/5 rounded-xl border border-white/5 flex items-center justify-center p-12">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#2d8c7f]/10 to-[#1a1a1a] flex items-center justify-center">
              <span className="text-white/5 text-6xl font-bold select-none">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-10">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" /><path d="M9 21V9" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[#2d8c7f] text-sm font-medium">{product.categoryName}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-2 leading-tight">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-white/30 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            <p className="text-white/50 text-sm mt-6 leading-relaxed">{product.shortDescription}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#2d8c7f] shrink-0" />
                <span className="text-white/70">{product.stockType === 'local' ? 'In stock, Bakersfield' : 'Available to order — ships within 1–2 days'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#2d8c7f] shrink-0" />
                <span className="text-white/70">Local pickup available in Bakersfield</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#2d8c7f] shrink-0" />
                <span className="text-white/70">Delivery within 15-mile radius</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button className="flex-1 px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors">
                Add to Cart — {formatPrice(product.price)}
              </button>
              <Link
                href="/checkout"
                className="px-6 py-3 border border-white/10 text-white/80 text-sm font-semibold rounded-lg hover:bg-white/5 text-center transition-colors"
              >
                Buy Now
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span>SKU: {product.id}</span>
                <span>Category: {product.categoryName}</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="border-t border-white/5 pt-12">
            <ProductGrid products={related} title={`More from ${product.categoryName}`} />
          </div>
        )}
      </div>
    </>
  )
}
