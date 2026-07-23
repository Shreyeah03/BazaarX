import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BX-${ts}-${rand}`
}

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod = 'cod', items: bodyItems } = req.body

  if (!shippingAddress?.line1 || !shippingAddress?.city || !shippingAddress?.pincode) {
    throw new ApiError(400, 'Complete shipping address is required')
  }

  let orderItems = []

  if (bodyItems?.length) {
    for (const entry of bodyItems) {
      const product = await Product.findOne({ legacyId: String(entry.productId || entry.id) })
      if (!product) throw new ApiError(404, `Product ${entry.productId} not found`)
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Number(entry.quantity) || 1,
        size: entry.size,
      })
    }
  } else {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart?.items?.length) throw new ApiError(400, 'Cart is empty')

    orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
    }))
  }

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shippingFee = subtotal >= 999 ? 0 : 99
  const total = subtotal + shippingFee

  const order = await Order.create({
    user: req.user._id,
    orderNumber: generateOrderNumber(),
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingFee,
    total,
    paymentMethod,
    status: paymentMethod === 'cod' ? 'processing' : 'pending',
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
  })

  if (!bodyItems?.length) {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
  }

  res.status(201).json({ success: true, order })
})

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json({ success: true, orders })
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate(
    'items.product'
  )
  if (!order) throw new ApiError(404, 'Order not found')
  res.json({ success: true, order })
})

export const confirmPayment = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
  if (!order) throw new ApiError(404, 'Order not found')

  const { paymentId } = req.body

  order.paymentStatus = 'paid'
  order.status = 'processing'
  if (paymentId) order.paymentId = paymentId
  await order.save()

  res.json({
    success: true,
    message: 'Payment confirmed (demo — wire Razorpay/Stripe in production)',
    order,
  })
})

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
  if (!order) throw new ApiError(404, 'Order not found')

  if (['shipped', 'delivered'].includes(order.status)) {
    throw new ApiError(400, 'Cannot cancel a shipped or delivered order')
  }

  order.status = 'cancelled'
  if (order.paymentStatus === 'paid') order.paymentStatus = 'refunded'
  await order.save()

  res.json({ success: true, message: 'Order cancelled', order })
})
