import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../utils/formatPrice'
import ProductImage from '../components/ui/ProductImage'

export default function Wishlist() {
  const { getWishlistProducts, removeFromWishlist } = useWishlist()
  const { addToCart, openDrawer } = useCart()
  const { addToast } = useToast()

  const products = getWishlistProducts

  const moveToCart = (product) => {
    addToCart(product.id)
    removeFromWishlist(product.id)
    addToast(`${product.name} moved to cart`)
    openDrawer()
  }

  return (
    <div className="pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            My <span className="gradient-text">Wishlist</span>
          </h1>
          <p className="text-gray-400">
            {products.length} saved item{products.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Shop
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <Link to={`/product/${product.id}`}>
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-5">
                  <p className="text-xs text-accent-purple font-medium uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold hover:text-white transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-accent-orange font-bold mt-2">{formatPrice(product.price)}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => moveToCart(product)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange text-white text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeFromWishlist(product.id)
                        addToast('Removed from wishlist', 'info')
                      }}
                      className="p-2.5 rounded-xl glass glass-hover text-gray-400 hover:text-red-400"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
