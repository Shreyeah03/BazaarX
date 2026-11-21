import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import ProductImage from '../components/ui/ProductImage'
import { collections } from '../data/collections'
import { getAllProducts, categoryToSlug } from '../utils/products'

function CollectionGrid() {
  return (
    <div className="pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-accent-purple text-sm font-semibold uppercase tracking-wider mb-2">
            Curated for you
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            Explore <span className="gradient-text">Collections</span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Find your next favourite in edits spanning streetwear, sneakers, and everyday tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={`/collections/${collection.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl glass-hover"
              >
                <ProductImage
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs font-semibold">
                  <Zap className="h-3 w-3 text-accent-orange" />
                  {collection.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-display text-2xl font-bold">{collection.title}</h2>
                  <p className="mt-1 text-sm text-gray-300">{collection.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-3">
                    Explore collection <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

function CollectionDetail({ collection }) {
  const products = getAllProducts().filter((product) =>
    collection.categories.includes(product.category)
  )

  return (
    <div className="pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/collections"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> All collections
        </Link>

        <section className="relative mb-12 flex min-h-[360px] items-end overflow-hidden rounded-3xl p-6 md:min-h-[440px] md:p-12">
          <ProductImage
            src={collection.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-orange">
              {collection.tag} collection
            </p>
            <h1 className="font-display text-4xl font-bold md:text-6xl">{collection.title}</h1>
            <p className="mt-4 max-w-xl text-gray-200 md:text-lg">{collection.description}</p>
          </div>
        </section>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="section-title">Shop the edit</h2>
            <p className="text-sm text-gray-400">
              {products.length} item{products.length !== 1 ? 's' : ''} in this collection
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {collection.categories.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${categoryToSlug(category)}`}
                className="rounded-full glass px-3 py-1.5 text-xs text-gray-300 transition-colors hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Collections() {
  const { collectionId } = useParams()
  const collection = collections.find((item) => item.id === collectionId)

  if (!collectionId || !collection) return <CollectionGrid />
  return <CollectionDetail collection={collection} />
}
