import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import products from '../../data/products.json'
import ProductCard from '../ui/ProductCard'

export default function TrendingProducts() {
  const trending = products.filter((p) => p.trending).slice(0, 4)

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent-purple text-sm font-semibold uppercase tracking-wider mb-2"
            >
              Trending
            </motion.p>
            <h2 className="section-title">Trending now</h2>
            <p className="section-subtitle mb-0">Best sellers from the last seven days.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors shrink-0"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
