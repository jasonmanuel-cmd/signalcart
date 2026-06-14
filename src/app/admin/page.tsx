import Link from 'next/link'
import { getProducts } from '@/lib/admin/store'

export default async function AdminDashboard() {
  const products = await getProducts()
  const localStock = products.filter((p) => p.stockType === 'local').length
  const featured = products.filter((p) => p.featured).length

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Total Products</p>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Local Stock</p>
            <p className="text-3xl font-bold text-[#2d8c7f]">{localStock}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Featured</p>
            <p className="text-3xl font-bold text-[#2d8c7f]">{featured}</p>
          </div>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex px-6 py-3 bg-[#2d8c7f] text-white text-sm font-semibold rounded-lg hover:bg-[#3aa89a] transition-colors"
        >
          Add New Product
        </Link>
      </div>
    </div>
  )
}

function AdminNav() {
  return (
    <div className="border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-white font-semibold text-sm">Signal Cart Admin</Link>
          <Link href="/admin/products" className="text-white/50 hover:text-white/80 text-sm transition-colors">Products</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/30 hover:text-white/50 text-xs transition-colors">View Site</Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

function LogoutButton() {
  return (
    <a href="/admin/login?logout=1" className="text-white/30 hover:text-red-400 text-xs transition-colors">
      Logout
    </a>
  )
}
