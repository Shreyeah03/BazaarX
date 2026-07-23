import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://bazaar-x-livid.vercel.app',
  'https://www.bazaar-x-livid.vercel.app',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
]

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(null, true)
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'BazaarX API is running' })
})

app.options('*', cors())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
