import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { getCategories, getPriceBounds } from '../../utils/products'

export default function ShopFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onClear,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const categories = getCategories()
  const bounds = getPriceBounds()

  const hasFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > bounds.min ||
    priceRange[1] < bounds.max ||
    minRating > 0

  const filterContent = (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-sm mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
                className="w-4 h-4 rounded accent-accent-purple"
              />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={500}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-accent-purple"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-4">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onRatingChange(rating)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                minRating === rating
                  ? 'bg-gradient-to-r from-accent-purple to-accent-orange text-white'
                  : 'glass glass-hover text-gray-400'
              }`}
            >
              {rating === 0 ? 'All' : `${rating}+ ★`}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="w-full py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 glass rounded-xl px-4 py-2.5 text-sm font-medium mb-6"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasFilters && (
          <span className="w-2 h-2 rounded-full bg-accent-orange" />
        )}
      </button>

      <aside className="hidden lg:block glass rounded-2xl p-6 sticky top-28 h-fit">
        <h2 className="font-display font-bold text-lg mb-6">Filters</h2>
        {filterContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 glass rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl glass-hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  )
}
