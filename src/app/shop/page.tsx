import { Metadata } from 'next'
import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import { products, getProductsByCategory } from '@/data/products'
import { categories } from '@/data/categories'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Shop All Products | ${siteConfig.name}`,
  description: `Browse our full catalog of curated products for nationwide shipping.`,
}

export default function ShopPage() {
  const categoriesWithCount = categories.filter(c => c.displayOrder > 0).map(c => ({
    ...c,
    productCount: getProductsByCategory(c.slug).length,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 shrink-0">
          <h2 className="text-[#1a1a1a] font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h2>
          <div className="flex flex-col gap-1">
            <Link href="/shop" className="text-[#1b7a6e] hover:text-[#145c52] text-sm py-1.5 font-medium transition-colors">
              All Products ({products.length})
            </Link>
            {categoriesWithCount.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="text-[#6b6560] hover:text-[#1a1a1a] text-sm py-1.5 transition-colors"
              >
                {cat.name} ({cat.productCount})
              </Link>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Shop</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-1">All Products</h1>
            </div>
            <span className="text-[#9c958e] text-sm">{products.length} products</span>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
