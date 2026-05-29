import Hero from '../components/home/Hero'
import TrendingProducts from '../components/home/TrendingProducts'
import Categories from '../components/home/Categories'
import FeaturedCollections from '../components/home/FeaturedCollections'
import Recommendations from '../components/home/Recommendations'
import AnimatedBanner from '../components/home/AnimatedBanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrendingProducts />
      <Categories />
      <AnimatedBanner />
      <FeaturedCollections />
      <Recommendations />
    </main>
  )
}
