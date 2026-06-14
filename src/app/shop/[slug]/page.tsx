import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import { siteConfig, shippingConfig } from '@/data/site'
import { formatPrice } from '@/lib/utils'
import { productSchema, breadcrumbSchema } from '@/lib/schema'
import ProductGrid from '@/components/ProductGrid'

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema(product, siteConfig))
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `https://${siteConfig.domain}/` },
          { name: 'Shop', url: `https://${siteConfig.domain}/shop` },
          { name: product.categoryName, url: `https://${siteConfig.domain}/categories/${product.categorySlug}` },
          { name: product.name, url: `https://${siteConfig.domain}/shop/${product.slug}` },
        ]))
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-[#9c958e] mb-8">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1a1a1a] transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-[#1a1a1a] transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-[#6b6560] truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div className="aspect-square bg-[#f0ede8] rounded-xl border border-[#e5e0da] flex items-center justify-center overflow-hidden">
            {product.imageUrl && !product.imageUrl.includes('placeholder') ? (
              <Image src={product.imageUrl} alt={product.name} width={600} height={600} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-12">
                <svg className="w-16 h-16 mx-auto text-[#d4cfc8] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[#9c958e] text-sm">{product.name}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-[#1b7a6e] text-xs font-semibold uppercase tracking-wider">{product.categoryName}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2 leading-tight">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-bold text-[#1a1a1a]">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-[#9c958e] line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            <p className="text-[#6b6560] text-sm mt-6 leading-relaxed">{product.shortDescription}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#1b7a6e] shrink-0" />
                <span className="text-[#6b6560]">{product.stockType === 'local' ? 'In stock — ships within 1 business day' : 'Available to order — ships within 1–2 days'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#1b7a6e] shrink-0" />
                <span className="text-[#6b6560]">Free shipping over ${shippingConfig.freeThreshold}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#1b7a6e] shrink-0" />
                <span className="text-[#6b6560]">Nationwide delivery via {shippingConfig.carriers.join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button className="flex-1 px-6 py-3.5 bg-[#c8914a] text-white text-sm font-semibold rounded-lg hover:bg-[#b8803a] transition-all hover:shadow-lg hover:shadow-[#c8914a]/20">
                Add to Cart — {formatPrice(product.price)}
              </button>
              <Link
                href="/checkout"
                className="px-6 py-3.5 border border-[#e5e0da] text-[#1a1a1a] text-sm font-semibold rounded-lg hover:bg-[#f0ede8] text-center transition-all"
              >
                Buy Now
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-[#e5e0da]">
              <div className="flex items-center gap-4 text-xs text-[#9c958e]">
                <span>SKU: {product.id}</span>
                <span>Category: {product.categoryName}</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="border-t border-[#e5e0da] pt-12">
            <div>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">More from {product.categoryName}</h2>
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
