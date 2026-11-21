import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingBag, Scale } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useCompare, MAX_COMPARE_PRODUCTS } from '../../context/CompareContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import { formatPrice } from '../../utils/formatPrice'
import ProductImage from './ProductImage'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, openDrawer } = useCart()
  const { isInCompare, toggleCompare } = useCompare()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToast } = useToast()

  const discount = useMemo(() => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return null
  }, [product.originalPrice, product.price])

  const wishlisted = isInWishlist(product.id)
  const comparing = isInCompare(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id)
    addToast(`${product.name} added to cart`)
    openDrawer()
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    addToast(
      wishlisted ? 'Removed from wishlist' : `${product.name} saved to wishlist`,
      wishlisted ? 'info' : 'success'
    )
  }

  const handleCompare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const result = toggleCompare(product.id)
    if (result === 'limit') {
      addToast(`You can compare up to ${MAX_COMPARE_PRODUCTS} products`, 'info')
      return
    }
    addToast(
      result === 'added' ? `${product.name} added to comparison` : `${product.name} removed from comparison`,
      result === 'added' ? 'success' : 'info'
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group glass rounded-2xl overflow-hidden glass-hover"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-accent-orange text-white text-xs font-bold">
              -{discount}%
            </span>
          )}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={handleWishlist}
              className={`p-2 rounded-xl glass transition-colors ${
                wishlisted ? 'text-accent-orange' : 'text-gray-300 hover:text-accent-orange'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleCompare}
              className={`p-2 rounded-xl glass transition-colors ${
                comparing ? 'text-accent-purple' : 'text-gray-300 hover:text-accent-purple'
              }`}
              aria-label={comparing ? 'Remove from comparison' : 'Add to comparison'}
              title={comparing ? 'Remove from comparison' : 'Add to comparison'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-accent-purple font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-sm md:text-base truncate group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 fill-accent-orange text-accent-orange" />
            <span className="text-sm text-gray-300">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-accent-orange">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
