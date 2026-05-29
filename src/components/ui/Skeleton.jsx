export function ProductCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-white/5 rounded" />
        <div className="h-4 w-3/4 bg-white/5 rounded" />
        <div className="h-3 w-20 bg-white/5 rounded" />
        <div className="h-5 w-24 bg-white/5 rounded" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-16 animate-pulse">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-3xl bg-white/5" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-white/5 rounded" />
          <div className="h-10 w-3/4 bg-white/5 rounded" />
          <div className="h-6 w-32 bg-white/5 rounded" />
          <div className="h-24 w-full bg-white/5 rounded-xl" />
          <div className="h-12 w-40 bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
