import products from '../data/products.json'

export function getAllProducts() {
  return products
}

export function getProductById(id) {
  return products.find((p) => p.id === String(id))
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category))].sort()
}

export function getPriceBounds() {
  const prices = products.map((p) => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export function getSimilarProducts(product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

export function categoryToSlug(category) {
  return category.toLowerCase().replace(/\s+/g, '-')
}

export function slugToCategory(slug) {
  const map = {
    sneakers: 'Sneakers',
    streetwear: 'Streetwear',
    watches: 'Watches',
    headphones: 'Headphones',
    'gaming-accessories': 'Gaming accessories',
    'smart-gadgets': 'Smart gadgets',
  }
  return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
