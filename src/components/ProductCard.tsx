import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice, truncate } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition-all"
    >
      <div className="aspect-square bg-[#f5f3ee]/5 flex items-center justify-center p-8">
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#2d8c7f]/10 to-[#1a1a1a] flex items-center justify-center">
          <span className="text-white/10 text-4xl font-bold select-none">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" /><path d="M9 21V9" />
            </svg>
          </span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs text-[#2d8c7f] font-medium">{product.categoryName}</span>
        <h3 className="text-sm text-white/90 font-medium mt-1 leading-snug group-hover:text-white transition-colors">
          {truncate(product.name, 60)}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white font-semibold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-white/30 text-sm line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        <span className={`inline-block mt-2 text-xs ${product.stockType === 'source' ? 'text-white/40' : 'text-[#2d8c7f]'}`}>
          {product.stockType === 'local' ? 'In stock, Bakersfield' : 'Available to order'}
        </span>
      </div>
    </Link>
  )
}
