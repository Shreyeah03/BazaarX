import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function Checkout() {
  return (
    <div className="pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12"
        >
          <h1 className="font-display text-3xl font-bold mb-4">
            Checkout <span className="gradient-text">soon</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Checkout is not live yet. You can still browse and fill your cart.
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
