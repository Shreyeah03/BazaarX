import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductImage from '../ui/ProductImage'
import { getProductById } from '../../utils/products'

const featured = getProductById('1')

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-orange/15 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-300 mb-6"
          >
            New drops every week
          </motion.span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6">
            Good gear for{' '}
            <span className="gradient-text">everyday.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            Sneakers, hoodies, watches, and tech. Ships anywhere in India.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              Shop now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/collections" className="btn-ghost">
              Collections
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: '50K+', label: 'Orders shipped' },
              { value: '2K+', label: 'Products' },
              { value: '4.9', label: 'Avg. rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="font-display text-xl sm:text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            <div className="glass rounded-3xl p-6 animate-float">
              <ProductImage
                src={featured?.image}
                alt="Nexus Air Runner sneaker"
                className="rounded-2xl w-full aspect-square object-cover"
                loading="eager"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-4 shadow-glow"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider">Trending</p>
              <p className="font-semibold mt-0.5">Nexus Air Runner</p>
              <p className="text-accent-orange font-bold">₹8,999</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 text-center"
            >
              <p className="text-2xl font-display font-bold gradient-text">4.8</p>
              <p className="text-xs text-gray-400">Rating</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
