import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  return (
    <Link href={`/shop/${product.slug}`} className="group">
      <article className="bg-white border border-[#e5e0da] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5">
        <div className="aspect-square bg-[#f0ede8] relative overflow-hidden">
          {product.imageUrl && !product.imageUrl.includes('placeholder') ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto text-[#d4cfc8] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-[#9c958e]">{product.name}</span>
              </div>
            </div>
          )}
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#c44a4a] text-white text-[10px] font-bold rounded-md">
              -{discountPercent}%
            </span>
          )}
          {product.stockType === 'local' && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-[#e8f5f3] text-[#1b7a6e] text-[10px] font-medium rounded-md">
              In Stock
            </span>
          )}
        </div>
        <div className="p-4">
          <span className="text-[10px] font-medium text-[#9c958e] uppercase tracking-wider">{product.categoryName}</span>
          <h3 className="text-sm font-semibold text-[#1a1a1a] mt-1 mb-2 line-clamp-2 leading-snug group-hover:text-[#1b7a6e] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#1a1a1a]">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-[#9c958e] line-through">${product.compareAtPrice!.toFixed(2)}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
