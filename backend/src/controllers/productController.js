import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import Product from '../models/Product.js'

const CATEGORY_SLUGS = {
  sneakers: 'Sneakers',
  streetwear: 'Streetwear',
  watches: 'Watches',
  headphones: 'Headphones',
  'gaming-accessories': 'Gaming accessories',
  'gaming accessories': 'Gaming accessories',
  'smart-gadgets': 'Smart gadgets',
  'smart gadgets': 'Smart gadgets',
}

function resolveCategory(input) {
  if (!input) return null
  const key = input.toLowerCase().trim()
  return CATEGORY_SLUGS[key] || input
}

function buildSort(sort) {
  switch (sort) {
    case 'price-asc':
      return { price: 1 }
    case 'price-desc':
      return { price: -1 }
    case 'rating':
      return { rating: -1 }
    case 'name':
      return { name: 1 }
    case 'featured':
    default:
      return { featured: -1, rating: -1 }
  }
}

export const getProducts = asyncHandler(async (req, res) => {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    minRating,
    sort = 'featured',
    page = 1,
    limit = 8,
    trending,
    featured,
  } = req.query

  const filter = {}

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ]
  }

  const resolvedCategory = resolveCategory(category)
  if (resolvedCategory) filter.category = resolvedCategory

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
  }

  if (minRating) filter.rating = { $gte: Number(minRating) }
  if (trending === 'true') filter.trending = true
  if (featured === 'true') filter.featured = true

  const pageNum = Math.max(1, Number(page))
  const limitNum = Math.min(50, Math.max(1, Number(limit)))
  const skip = (pageNum - 1) * limitNum

  const [products, total] = await Promise.all([
    Product.find(filter).sort(buildSort(sort)).skip(skip).limit(limitNum),
    Product.countDocuments(filter),
  ])

  res.json({
    success: true,
    products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  })
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ legacyId: req.params.id })
  if (!product) throw new ApiError(404, 'Product not found')
  res.json({ success: true, product })
})

export const getTrending = asyncHandler(async (_req, res) => {
  const products = await Product.find({ trending: true }).sort({ rating: -1 }).limit(8)
  res.json({ success: true, products })
})

export const getFeatured = asyncHandler(async (_req, res) => {
  const products = await Product.find({ featured: true }).sort({ rating: -1 }).limit(8)
  res.json({ success: true, products })
})

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Product.distinct('category')
  res.json({ success: true, categories })
})

export const getRelated = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ legacyId: req.params.id })
  if (!product) throw new ApiError(404, 'Product not found')

  const products = await Product.find({
    category: product.category,
    legacyId: { $ne: product.legacyId },
  })
    .sort({ rating: -1 })
    .limit(4)

  res.json({ success: true, products })
})
