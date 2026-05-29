import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { getProductById } from '../utils/products'

const WISHLIST_KEY = 'bazaarx-wishlist'
const WishlistContext = createContext(null)

function loadWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadWishlist)

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids))
  }, [ids])

  const wishlistCount = ids.length

  const isInWishlist = useCallback((productId) => ids.includes(productId), [ids])

  const toggleWishlist = useCallback((productId) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setIds((prev) => prev.filter((id) => id !== productId))
  }, [])

  const getWishlistProducts = useMemo(() => {
    return ids.map((id) => getProductById(id)).filter(Boolean)
  }, [ids])

  return (
    <WishlistContext.Provider
      value={{
        ids,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        getWishlistProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
