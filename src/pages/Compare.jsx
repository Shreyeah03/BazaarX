import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Scale, Star, X } from 'lucide-react'
import { useCompare, MAX_COMPARE_PRODUCTS } from '../context/CompareContext'
import { formatPrice } from '../utils/formatPrice'
import ProductImage from '../components/ui/ProductImage'

export default function Compare() {
  const { products, removeFromCompare, clearCompare } = useCompare()
  const lowestPrice = Math.min(...products.map((product) => product.price))
  const highestRating = Math.max(...products.map((product) => product.rating))
  const emptySlots = Math.max(0, MAX_COMPARE_PRODUCTS - products.length)

  return (
    <main className="px-4 pb-16 pt-32 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-purple">
              Side by side
            </p>
            <h1 className="font-display text-3xl font-bold md:text-5xl">
              Product <span className="gradient-text">comparison</span>
            </h1>
            <p className="mt-3 text-gray-400">Compare up to three picks before you decide.</p>
          </div>
          {products.length > 0 && (
            <button type="button" onClick={clearCompare} className="btn-ghost inline-flex items-center gap-2">
              <X className="h-4 w-4" /> Clear all
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <section className="glass rounded-3xl px-6 py-16 text-center">
            <Scale className="mx-auto mb-4 h-12 w-12 text-accent-purple" />
            <h2 className="font-display text-2xl font-bold">Your comparison is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-gray-400">
              Add products from the shop or a product page to compare price, ratings, and details here.
            </p>
            <Link to="/shop" className="btn-primary mt-6 inline-flex items-center gap-2">
              Browse products <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </section>
        ) : (
          <>
            <div className="overflow-x-auto rounded-3xl glass">
              <table className="w-full min-w-[760px] table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="w-40 border-b border-white/10 p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:w-52">
                      At a glance
                    </th>
                    {products.map((product) => (
                      <th key={product.id} className="border-b border-l border-white/10 p-4 text-left align-top">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute right-0 top-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label={`Remove ${product.name} from comparison`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <Link to={`/product/${product.id}`} className="block">
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              className="mb-4 aspect-square w-full rounded-2xl object-cover"
                            />
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-purple">
                              {product.category}
                            </p>
                            <h2 className="pr-8 text-left font-display text-base font-bold md:text-lg">
                              {product.name}
                            </h2>
                          </Link>
                        </div>
                      </th>
                    ))}
                    {Array.from({ length: emptySlots }).map((_, index) => (
                      <th key={`empty-${index}`} className="border-b border-l border-white/10 p-4 text-left">
                        <Link
                          to="/shop"
                          className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-gray-400 transition-colors hover:border-accent-purple hover:text-white"
                        >
                          <Plus className="mb-2 h-6 w-6" />
                          Add a product
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/[0.03]">
                    <th className="p-4 text-left text-sm font-semibold">Price</th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className={`border-l border-white/10 p-4 font-bold ${
                          product.price === lowestPrice ? 'text-accent-orange' : ''
                        }`}
                      >
                        {formatPrice(product.price)}
                        {product.price === lowestPrice && (
                          <span className="ml-2 text-xs font-medium text-accent-orange">Best price</span>
                        )}
                      </td>
                    ))}
                    {emptySlots > 0 && <td colSpan={emptySlots} className="border-l border-white/10" />}
                  </tr>
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Original price</th>
                    {products.map((product) => (
                      <td key={product.id} className="border-l border-white/10 p-4 text-gray-400">
                        {product.originalPrice ? formatPrice(product.originalPrice) : '—'}
                      </td>
                    ))}
                    {emptySlots > 0 && <td colSpan={emptySlots} className="border-l border-white/10" />}
                  </tr>
                  <tr className="bg-white/[0.03]">
                    <th className="p-4 text-left text-sm font-semibold">Rating</th>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className={`border-l border-white/10 p-4 ${
                          product.rating === highestRating ? 'text-accent-orange' : ''
                        }`}
                      >
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Star className="h-4 w-4 fill-current" /> {product.rating}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">({product.reviews} reviews)</span>
                        {product.rating === highestRating && (
                          <span className="ml-2 text-xs font-medium text-accent-orange">Top rated</span>
                        )}
                      </td>
                    ))}
                    {emptySlots > 0 && <td colSpan={emptySlots} className="border-l border-white/10" />}
                  </tr>
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Available sizes</th>
                    {products.map((product) => (
                      <td key={product.id} className="border-l border-white/10 p-4 text-sm text-gray-300">
                        {product.sizes?.length ? product.sizes.join(', ') : 'Not specified'}
                      </td>
                    ))}
                    {emptySlots > 0 && <td colSpan={emptySlots} className="border-l border-white/10" />}
                  </tr>
                  <tr className="bg-white/[0.03]">
                    <th className="p-4 text-left align-top text-sm font-semibold">About</th>
                    {products.map((product) => (
                      <td key={product.id} className="border-l border-white/10 p-4 text-sm leading-relaxed text-gray-400">
                        {product.description}
                      </td>
                    ))}
                    {emptySlots > 0 && <td colSpan={emptySlots} className="border-l border-white/10" />}
                  </tr>
                </tbody>
              </table>
            </div>
            {products.length < 2 && (
              <p className="mt-4 text-center text-sm text-gray-400">
                Add at least one more product to make a useful comparison.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
