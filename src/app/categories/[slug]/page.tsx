import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'
import { siteConfig } from '@/data/site'
import ProductGrid from '@/components/ProductGrid'
import FAQAccordion from '@/components/FAQAccordion'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: category.seoTitle,
    description: category.metaDescription,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(category.faqBlock)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: `https://${siteConfig.domain}/` },
          { name: 'Categories', url: `https://${siteConfig.domain}/categories` },
          { name: category.name, url: `https://${siteConfig.domain}/categories/${category.slug}` },
        ]))
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-[#9c958e] mb-8">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#1a1a1a] transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-[#6b6560]">{category.name}</span>
        </nav>

        <div className="mb-10">
          <span className="text-[#c8914a] text-xs font-semibold uppercase tracking-widest">Category</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2">{category.name}</h1>
          <p className="text-[#6b6560] mt-4 max-w-2xl leading-relaxed">{category.heroCopy}</p>
        </div>

        <ProductGrid products={categoryProducts} />

        {category.faqBlock.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#e5e0da]">
            <FAQAccordion items={category.faqBlock} />
          </div>
        )}
      </div>
    </>
  )
}
