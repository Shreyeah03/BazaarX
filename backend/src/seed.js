import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import Product from './models/Product.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  await connectDB()

  const candidates = [
    path.join(__dirname, '../data/products.json'),
    path.join(__dirname, '../../src/data/products.json'),
  ]

  const dataPath = candidates.find((p) => fs.existsSync(p))
  if (!dataPath) {
    throw new Error('products.json not found — copy src/data/products.json to backend/data/')
  }
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const products = JSON.parse(raw)

  await Product.deleteMany({})

  const docs = products.map((p) => ({
    legacyId: String(p.id),
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    images: p.images || [p.image],
    description: p.description,
    sizes: p.sizes || [],
    trending: Boolean(p.trending),
    featured: Boolean(p.featured),
    reviewList: p.reviewList || [],
    stock: 50,
  }))

  await Product.insertMany(docs)
  console.log(`Seeded ${docs.length} products`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
