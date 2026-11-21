import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Heart, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Compass,
    title: 'A considered edit',
    description: 'A focused mix of sneakers, streetwear, watches, and useful everyday tech.',
  },
  {
    icon: Sparkles,
    title: 'Personal style, your way',
    description: 'Discover pieces that fit your routine, whether you are dressing up or winding down.',
  },
  {
    icon: Heart,
    title: 'Made for everyday',
    description: 'We keep the experience straightforward, from browsing a collection to finding a favourite.',
  },
]

export default function About() {
  return (
    <main className="pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-3xl glass px-6 py-14 md:px-16 md:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-purple/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-orange">
              About BazaarX
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Good finds for <span className="gradient-text">everyday life.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              BazaarX is an online destination for sneakers, streetwear, watches, and tech.
              We bring a mix of personal style and practical essentials together, so it is easier
              to find something that feels like you.
            </p>
            <Link to="/collections" className="btn-primary mt-8 inline-flex items-center gap-2">
              Explore our collections <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-purple">
              What we are about
            </p>
            <h2 className="section-title">A little less scrolling. A lot more you.</h2>
            <p className="text-gray-400">
              From a new pair of everyday sneakers to the finishing touch for your setup,
              browse an edit that makes discovering your next go-to simple.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="glass rounded-2xl p-6 md:p-8">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-orange/20 text-accent-orange">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-accent-purple/20 to-accent-orange/20 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Find your next favourite.</h2>
            <p className="mt-2 text-gray-300">Browse the latest picks across the BazaarX edit.</p>
          </div>
          <Link to="/shop" className="btn-ghost inline-flex shrink-0 items-center gap-2">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
