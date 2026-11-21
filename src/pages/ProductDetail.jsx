import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingBag, Minus, Plus, ChevronLeft, Scale } from 'lucide-react'
import { getProductById, getSimilarProducts } from '../utils/products'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'
import { useCompare, MAX_COMPARE_PRODUCTS } from '../context/CompareContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ui/ProductCard'
import { ProductDetailSkeleton } from '../components/ui/Skeleton'
import ProductImage from '../components/ui/ProductImage'

export default function ProductDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false })

  const { addToCart, openDrawer } = useCart()
  const { isInCompare, toggleCompare } = useCompare()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToast } = useToast()

  const product = getProductById(id)
  const similar = product ? getSimilarProducts(product) : []
  const images = product?.images?.length ? product.images : product ? [product.image] : []
  const wishlisted = product ? isInWishlist(product.id) : false
  const comparing = product ? isInCompare(product.id) : false

  useEffect(() => {
    setLoading(true)
    setActiveImage(0)
    setQuantity(1)
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [id])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoom({ x, y, active: true })
  }

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product.id, quantity)
    addToast(`${quantity}× ${product.name} added to cart`)
    openDrawer()
  }

  const handleWishlist = () => {
    if (!product) return
    toggleWishlist(product.id)
    addToast(
      wishlisted ? 'Removed from wishlist' : `${product.name} saved to wishlist`,
      wishlisted ? 'info' : 'success'
    )
  }

  const handleCompare = () => {
    if (!product) return
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

  if (loading) return <ProductDetailSkeleton />

  if (!product) {
    return (
      <div className="pt-28 pb-16 px-4 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="btn-primary inline-block">
          Back to Shop
        </Link>
      </div>
    )
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-16 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div
              className="relative aspect-square rounded-3xl overflow-hidden glass mb-4 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
            >
              <ProductImage
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                loading="eager"
                style={
                  zoom.active
                    ? {
                        transform: 'scale(1.8)',
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      }
                    : { transform: 'scale(1)' }
                }
              />
              {discount && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-accent-orange text-white text-sm font-bold">
                  -{discount}%
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-accent-purple' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ProductImage src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-accent-purple text-sm font-semibold uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent-orange text-accent-orange'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-accent-orange">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="px-4 py-2 rounded-xl glass glass-hover text-sm font-medium"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm font-medium">Quantity</p>
              <div className="flex items-center gap-3 glass rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-lg hover:bg-white/10"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 rounded-lg hover:bg-white/10"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={handleAddToCart} className="btn-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleWishlist}
                className={`btn-ghost flex items-center gap-2 ${
                  wishlisted ? 'text-accent-orange border-accent-orange/30' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                {wishlisted ? 'Saved' : 'Wishlist'}
              </button>
              <button
                type="button"
                onClick={handleCompare}
                className={`btn-ghost flex items-center gap-2 ${
                  comparing ? 'text-accent-purple border-accent-purple/30' : ''
                }`}
              >
                <Scale className="w-5 h-5" />
                {comparing ? 'In comparison' : 'Compare'}
              </button>
            </div>
          </div>
        </div>

        {product.reviewList?.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">Reviews</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.reviewList.map((review) => (
                <div key={review.id} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-accent-orange text-accent-orange' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                  <p className="text-xs text-gray-600 mt-3">{review.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">More in this category</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {similar.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  )
}
