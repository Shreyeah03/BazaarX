import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import Wishlist from '../models/Wishlist.js'
import Product from '../models/Product.js'

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products')
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] })
    wishlist = await Wishlist.findById(wishlist._id).populate('products')
  }
  return wishlist
}

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id)
  res.json({
    success: true,
    products: wishlist.products.map((p) => p.toJSON()),
    ids: wishlist.products.map((p) => p.legacyId),
  })
})

export const addToWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ legacyId: String(req.params.productId) })
  if (!product) throw new ApiError(404, 'Product not found')

  const wishlist = await getOrCreateWishlist(req.user._id)
  const exists = wishlist.products.some((p) => p._id.equals(product._id))

  if (!exists) {
    wishlist.products.push(product._id)
    await wishlist.save()
  }

  const populated = await Wishlist.findById(wishlist._id).populate('products')
  res.json({
    success: true,
    message: 'Added to wishlist',
    products: populated.products.map((p) => p.toJSON()),
    ids: populated.products.map((p) => p.legacyId),
  })
})

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ legacyId: String(req.params.productId) })
  if (!product) throw new ApiError(404, 'Product not found')

  const wishlist = await getOrCreateWishlist(req.user._id)
  wishlist.products = wishlist.products.filter((p) => !p._id.equals(product._id))
  await wishlist.save()

  const populated = await Wishlist.findById(wishlist._id).populate('products')
  res.json({
    success: true,
    message: 'Removed from wishlist',
    products: populated.products.map((p) => p.toJSON()),
    ids: populated.products.map((p) => p.legacyId),
  })
})

export const syncWishlist = asyncHandler(async (req, res) => {
  const { ids = [] } = req.body
  const products = await Product.find({ legacyId: { $in: ids.map(String) } })

  const wishlist = await getOrCreateWishlist(req.user._id)
  wishlist.products = products.map((p) => p._id)
  await wishlist.save()

  const populated = await Wishlist.findById(wishlist._id).populate('products')
  res.json({
    success: true,
    message: 'Wishlist synced',
    products: populated.products.map((p) => p.toJSON()),
    ids: populated.products.map((p) => p.legacyId),
  })
})
