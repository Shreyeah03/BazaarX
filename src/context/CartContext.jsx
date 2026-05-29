import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { getProductById } from '../utils/products'

const CART_KEY = 'bazaarx-cart'
const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const cartCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const cartTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [items]
  )

  const addToCart = useCallback((productId, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const getCartProducts = useCallback(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId)
        if (!product) return null
        return { ...product, quantity: item.quantity }
      })
      .filter(Boolean)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        drawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        getCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
