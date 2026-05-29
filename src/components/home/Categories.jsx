import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Footprints,
  Shirt,
  Watch,
  Headphones,
  Gamepad2,
  Smartphone,
} from 'lucide-react'
import ProductImage from '../ui/ProductImage'

const categories = [
  {
    name: 'Sneakers',
    slug: 'sneakers',
    icon: Footprints,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    count: 240,
    gradient: 'from-purple-500/30 to-orange-500/20',
  },
  {
    name: 'Streetwear',
    slug: 'streetwear',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80',
    count: 180,
    gradient: 'from-orange-500/30 to-pink-500/20',
  },
  {
    name: 'Watches',
    slug: 'watches',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    count: 95,
    gradient: 'from-blue-500/30 to-purple-500/20',
  },
  {
    name: 'Smart gadgets',
    slug: 'smart-gadgets',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=80',
    count: 120,
    gradient: 'from-cyan-500/30 to-purple-500/20',
  },
  {
    name: 'Gaming accessories',
    slug: 'gaming-accessories',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=400&q=80',
    count: 156,
    gradient: 'from-green-500/30 to-purple-500/20',
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    count: 88,
    gradient: 'from-violet-500/30 to-orange-500/20',
  },
]

export default function Categories() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-surface-elevated/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-orange text-sm font-semibold uppercase tracking-wider mb-2">Categories</p>
          <h2 className="section-title">Shop by type</h2>
          <p className="section-subtitle mx-auto">Sneakers, clothes, watches, and electronics.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group block glass rounded-2xl overflow-hidden glass-hover h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} to-black/60`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <cat.icon className="w-6 h-6 text-white mb-2 opacity-80" />
                    <h3 className="font-semibold text-sm md:text-base">{cat.name}</h3>
                    <p className="text-xs text-gray-300 mt-0.5">{cat.count}+ items</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
