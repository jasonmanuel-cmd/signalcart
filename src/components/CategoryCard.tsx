import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/types'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <article className="bg-white border border-[#e5e0da] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5">
        <div className="aspect-[4/3] bg-[#f0ede8] relative overflow-hidden">
          {category.imageUrl ? (
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[#d4cfc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-[#1a1a1a] group-hover:text-[#1b7a6e] transition-colors">{category.name}</h3>
          <p className="text-sm text-[#6b6560] mt-1 line-clamp-2">{category.shortDescription}</p>
          <span className="inline-block mt-3 text-xs font-medium text-[#1b7a6e]">
            {category.productCount} items &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}
