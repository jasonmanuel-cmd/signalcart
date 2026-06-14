import { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { siteConfig } from '@/data/site'
import { getProductsByCategory } from '@/data/products'

export const metadata: Metadata = {
  title: `Categories | ${siteConfig.name}`,
  description: `Browse all product categories available for nationwide shipping.`,
}

export default function CategoriesPage() {
  const visibleCategories = categories.filter(c => c.displayOrder > 0).sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Browse</span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2">Categories</h1>
        <p className="text-[#6b6560] mt-4 max-w-xl">Browse by category. Every section is curated for quality and nationwide availability.</p>
      </div>

      <div className="grid gap-5">
        {visibleCategories.map((cat) => {
          const count = getProductsByCategory(cat.slug).length
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group block bg-white border border-[#e5e0da] rounded-xl p-6 md:p-8 hover:border-[#1b7a6e]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-[#1b7a6e] transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-[#6b6560] text-sm mt-2 leading-relaxed max-w-2xl">{cat.description}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-[#9c958e] text-xs">{count} products</span>
                    <span className="text-[#1b7a6e] text-xs font-medium group-hover:translate-x-1 transition-transform">
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
