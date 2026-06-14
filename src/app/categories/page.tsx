import { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { siteConfig } from '@/data/site'
import { getProductsByCategory } from '@/data/products'

export const metadata: Metadata = {
  title: `Categories | ${siteConfig.name}`,
  description: `Browse all product categories available for local pickup and delivery in Bakersfield.`,
}

export default function CategoriesPage() {
  const visibleCategories = categories.filter(c => c.displayOrder > 0).sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-white mb-4">Categories</h1>
      <p className="text-white/50 mb-10 max-w-xl">Browse by category. Every section is curated for quality and local availability.</p>

      <div className="grid gap-6">
        {visibleCategories.map((cat) => {
          const count = getProductsByCategory(cat.slug).length
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group block bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8 hover:border-[#2d8c7f]/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white group-hover:text-[#2d8c7f] transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-white/40 text-sm mt-2 leading-relaxed max-w-2xl">{cat.description}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-white/30 text-xs">{count} products</span>
                    <span className="text-[#2d8c7f] text-xs font-medium group-hover:translate-x-1 transition-transform">
                      Browse category &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
