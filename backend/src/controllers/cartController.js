import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product')
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] })
    cart = await Cart.findById(cart._id).populate('items.product')
  }
  return cart
}

function formatCartItem(item) {
  const product = item.product?.toJSON?.() ?? item.product
  return {
    productId: product?.id ?? product?.legacyId,
    name: product?.name,
    price: product?.price,
    image: product?.image,
    quantity: item.quantity,
    size: item.size || null,
  }
}

function cartSummary(cart) {
  const items = cart.items.map(formatCartItem)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return { items, subtotal, itemCount: items.reduce((n, i) => n + i.quantity, 0) }
}

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  res.json({ success: true, ...cartSummary(cart) })
})

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, size } = req.body
  if (!productId) throw new ApiError(400, 'productId is required')

  const product = await Product.findOne({ legacyId: String(productId) })
  if (!product) throw new ApiError(404, 'Product not found')

  const cart = await getOrCreateCart(req.user._id)
  const existing = cart.items.find(
    (item) => item.product._id.equals(product._id) && (item.size || null) === (size || null)
  )

  if (existing) {
    existing.quantity += Number(quantity)
  } else {
    cart.items.push({ product: product._id, quantity: Number(quantity), size })
  }

  await cart.save()
  const populated = await Cart.findById(cart._id).populate('items.product')
  res.json({ success: true, message: 'Added to cart', ...cartSummary(populated) })
})

export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const { quantity, size } = req.body

  const product = await Product.findOne({ legacyId: String(productId) })
  if (!product) throw new ApiError(404, 'Product not found')

  const cart = await getOrCreateCart(req.user._id)
  const item = cart.items.find((i) => i.product._id.equals(product._id))

  if (!item) throw new ApiError(404, 'Item not in cart')

  if (quantity !== undefined) {
    if (Number(quantity) < 1) {
      cart.items = cart.items.filter((i) => !i.product._id.equals(product._id))
    } else {
      item.quantity = Number(quantity)
    }
  }
  if (size !== undefined) item.size = size

  await cart.save()
  const populated = await Cart.findById(cart._id).populate('items.product')
  res.json({ success: true, ...cartSummary(populated) })
})

export const removeFromCart = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ legacyId: String(req.params.productId) })
  if (!product) throw new ApiError(404, 'Product not found')

  const cart = await getOrCreateCart(req.user._id)
  cart.items = cart.items.filter((i) => !i.product._id.equals(product._id))
  await cart.save()

  const populated = await Cart.findById(cart._id).populate('items.product')
  res.json({ success: true, message: 'Removed from cart', ...cartSummary(populated) })
})

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.items = []
  await cart.save()
  res.json({ success: true, items: [], subtotal: 0, itemCount: 0 })
})

export const syncCart = asyncHandler(async (req, res) => {
  const { items = [] } = req.body
  const cart = await getOrCreateCart(req.user._id)

  const resolved = []
  for (const entry of items) {
    const product = await Product.findOne({ legacyId: String(entry.productId || entry.id) })
    if (!product) continue
    resolved.push({
      product: product._id,
      quantity: Math.max(1, Number(entry.quantity) || 1),
      size: entry.size || undefined,
    })
  }

  cart.items = resolved
  await cart.save()
  const populated = await Cart.findById(cart._id).populate('items.product')
  res.json({ success: true, message: 'Cart synced', ...cartSummary(populated) })
})
