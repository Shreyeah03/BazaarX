import { Link } from 'react-router-dom'
import { ArrowRight, Scale, X } from 'lucide-react'
import { useCompare } from '../../context/CompareContext'

export default function CompareBar() {
  const { products, clearCompare } = useCompare()

  if (products.length === 0) return null

  return (
    <aside className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-4xl rounded-2xl glass p-3 shadow-2xl md:bottom-5 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-purple/20 text-accent-purple sm:flex">
            <Scale className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              Compare products <span className="text-gray-400">({products.length}/3)</span>
            </p>
            <p className="truncate text-xs text-gray-400">
              {products.map((product) => product.name).join(' · ')}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:text-white"
            aria-label="Clear comparison"
            title="Clear comparison"
          >
            <X className="h-4 w-4" />
          </button>
          <Link to="/compare" className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm">
            Compare now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
