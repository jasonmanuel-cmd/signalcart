import { Metadata } from 'next'
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
  const faqJsonLd = faqSchema(category.faqBlock)
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', url: `https://${siteConfig.domain}/` },
    { name: 'Categories', url: `https://${siteConfig.domain}/categories` },
    { name: category.name, url: `https://${siteConfig.domain}/categories/${category.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
          <a href="/" className="hover:text-white/60">Home</a><span>/</span>
          <a href="/categories" className="hover:text-white/60">Categories</a><span>/</span>
          <span className="text-white/50">{category.name}</span>
        </nav>

        <div className="mb-10">
          <span className="text-[#2d8c7f] text-sm font-semibold tracking-widest uppercase">Category</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{category.name}</h1>
          <p className="text-white/50 mt-4 max-w-2xl leading-relaxed">{category.heroCopy}</p>
        </div>

        <ProductGrid products={categoryProducts} />

        {category.faqBlock.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/5">
            <FAQAccordion items={category.faqBlock} title={`${category.name} — FAQ`} />
          </div>
        )}
      </div>
    </>
  )
}
