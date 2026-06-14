import Link from 'next/link'
import { Category } from '@/types'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white/[0.02] border border-white/5 rounded-lg p-6 hover:border-[#2d8c7f]/30 hover:bg-white/[0.04] transition-all"
    >
      <h3 className="text-white font-semibold group-hover:text-[#2d8c7f] transition-colors">
        {category.name}
      </h3>
      <p className="text-white/40 text-sm mt-2 leading-relaxed line-clamp-2">
        {category.shortDescription}
      </p>
      <span className="inline-block text-[#2d8c7f] text-xs font-medium mt-4 group-hover:translate-x-1 transition-transform">
        Browse &rarr;
      </span>
    </Link>
  )
}
