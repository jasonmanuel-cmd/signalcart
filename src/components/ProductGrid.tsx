import { Product } from '@/types'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: number }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#9c958e]">No products found.</p>
      </div>
    )
  }

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[4]} gap-4 md:gap-5`}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
