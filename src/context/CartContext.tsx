'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
  price: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number; price: number }
  | { type: 'REMOVE_ITEM'; productSlug: string }
  | { type: 'UPDATE_QUANTITY'; productSlug: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productSlug: string) => void
  updateQuantity: (productSlug: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.slug === action.product.slug)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.slug === action.product.slug
              ? { ...i, quantity: i.quantity + action.quantity, price: action.price }
              : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity, price: action.price }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.slug !== action.productSlug) }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((i) =>
          i.product.slug === action.productSlug ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { items: [] }
    case 'LOAD_CART':
      return { items: action.items }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('signalcart-cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'LOAD_CART', items: parsed })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('signalcart-cart', JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  const addItem = useCallback((product: Product, quantity = 1) => {
    let price = product.price
    if (product.qtyPrices) {
      if (quantity >= (product.boxQty || 999)) price = product.qtyPrices.box
      else if (quantity >= 10) price = product.qtyPrices[10]
      else if (quantity >= 5) price = product.qtyPrices[5]
      else price = product.qtyPrices[1]
    }
    dispatch({ type: 'ADD_ITEM', product, quantity, price })
  }, [])

  const removeItem = useCallback((productSlug: string) => {
    dispatch({ type: 'REMOVE_ITEM', productSlug })
  }, [])

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    if (quantity < 1) { dispatch({ type: 'REMOVE_ITEM', productSlug }); return }
    dispatch({ type: 'UPDATE_QUANTITY', productSlug, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
