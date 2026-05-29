import { motion } from 'framer-motion'
import products from '../../data/products.json'
import ProductCard from '../ui/ProductCard'
import ProductImage from '../ui/ProductImage'

export default function Recommendations() {
  const recommended = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-surface-elevated/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-10 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px]" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-accent-orange text-sm font-semibold mb-3">
                For you
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Recommended</h2>
              <p className="text-gray-400 max-w-md">
                Popular items based on ratings and recent orders.
              </p>
            </div>
            <div className="flex -space-x-3">
              {recommended.slice(0, 3).map((p) => (
                <ProductImage
                  key={p.id}
                  src={p.image}
                  alt=""
                  className="w-14 h-14 rounded-full border-2 border-surface object-cover"
                />
              ))}
              <div className="w-14 h-14 rounded-full border-2 border-surface bg-gradient-to-br from-accent-purple to-accent-orange flex items-center justify-center text-xs font-bold">
                +9
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {recommended.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
