import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProductById } from '../utils/products'

const COMPARE_KEY = 'bazaarx-compare'
export const MAX_COMPARE_PRODUCTS = 3
const CompareContext = createContext(null)

function loadCompareIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]')
    if (!Array.isArray(stored)) return []
    return [...new Set(stored.filter((id) => typeof id === 'string' && getProductById(id)))].slice(
      0,
      MAX_COMPARE_PRODUCTS
    )
  } catch {
    return []
  }
}

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(loadCompareIds)

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(ids))
  }, [ids])

  const isInCompare = useCallback((productId) => ids.includes(productId), [ids])

  const toggleCompare = useCallback(
    (productId) => {
      if (ids.includes(productId)) {
        setIds(ids.filter((id) => id !== productId))
        return 'removed'
      }
      if (ids.length >= MAX_COMPARE_PRODUCTS) return 'limit'
      setIds([...ids, productId])
      return 'added'
    },
    [ids]
  )

  const removeFromCompare = useCallback(
    (productId) => setIds((current) => current.filter((id) => id !== productId)),
    []
  )
  const clearCompare = useCallback(() => setIds([]), [])
  const products = useMemo(() => ids.map((id) => getProductById(id)).filter(Boolean), [ids])

  return (
    <CompareContext.Provider
      value={{ ids, products, isInCompare, toggleCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error('useCompare must be used within CompareProvider')
  return context
}
