import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'
import ProductImage from '../ui/ProductImage'

export default function CartDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    getCartProducts,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart()

  const cartProducts = getCartProducts()

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md glass border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h2 className="font-display text-xl font-bold">Your Cart</h2>
                <p className="text-sm text-gray-400">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-xl glass-hover text-gray-400 hover:text-white"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-6">Your cart is empty</p>
                  <Link to="/shop" onClick={closeDrawer} className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex gap-4 glass rounded-2xl p-3"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-accent-orange font-bold text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-display text-xl font-bold gradient-text">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeDrawer}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
