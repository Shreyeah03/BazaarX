import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductImage from '../ui/ProductImage'
import { ArrowRight, Zap } from 'lucide-react'
import { collections } from '../../data/collections'

export default function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-accent-purple text-sm font-semibold uppercase tracking-wider mb-2">Collections</p>
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle mb-0">Seasonal picks from the BazaarX team.</p>
          </div>
          <Link to="/collections" className="btn-ghost inline-flex items-center gap-2 self-start sm:self-center">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/collections/${col.id}`}
                className="group block relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] glass-hover"
              >
                <ProductImage
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass text-xs font-semibold">
                    <Zap className="w-3 h-3 text-accent-orange" />
                    {col.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold mb-1 group-hover:gradient-text transition-all">
                    {col.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{col.subtitle}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                    See collection
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
