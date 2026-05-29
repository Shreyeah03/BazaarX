import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function AnimatedBanner() {
  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass min-h-[200px] md:min-h-[240px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 via-transparent to-accent-orange/30" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full px-8 md:px-12 py-10">
            <div className="text-center md:text-left">
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-accent-orange text-sm font-bold uppercase tracking-widest mb-2"
              >
                Flash sale. 48 hours left.
              </motion.p>
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-2">
                Up to <span className="gradient-text">40% off</span> streetwear
              </h3>
              <p className="text-gray-400 text-sm md:text-base">Code BAZAARX40. Free delivery on orders over ₹2,999.</p>
            </div>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 shrink-0">
              Shop the sale
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
