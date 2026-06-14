import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'
import { products, getProductsByCategory, searchProducts } from '@/data/products'
import { categories } from '@/data/categories'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: `Shop All Products | ${siteConfig.name}`,
  description: `Browse our full catalog of curated products available for local pickup and delivery in Bakersfield.`,
}

function getCategoryCount(slug: string): number {
  return getProductsByCategory(slug).length
}

export default function ShopPage() {
  const categoriesWithCount = categories.filter(c => c.displayOrder > 0).map(c => ({
    ...c,
    productCount: getCategoryCount(c.slug),
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 shrink-0">
          <h2 className="text-white font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-1">
            <a href="/shop" className="text-white/60 hover:text-white text-sm py-1.5 transition-colors">
              All Products ({products.length})
            </a>
            {categoriesWithCount.map((cat) => (
              <a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="text-white/60 hover:text-white text-sm py-1.5 transition-colors"
              >
                {cat.name} ({cat.productCount})
              </a>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">All Products</h1>
            <span className="text-white/40 text-sm">{products.length} products</span>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
