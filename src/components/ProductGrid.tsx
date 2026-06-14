import ProductCard from './ProductCard'
import { Product } from '@/types'

export default function ProductGrid({ products, title }: { products: Product[]; title?: string }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/50">No products found.</p>
      </div>
    )
  }

  return (
    <div>
      {title && <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
