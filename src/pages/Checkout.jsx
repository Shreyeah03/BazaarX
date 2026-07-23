import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatPrice'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'cod',
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

export default function Checkout() {
  const { getCartProducts, cartTotal, clearCart } = useCart()
  const { user, token, isAuthenticated } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const cartProducts = getCartProducts()
  const subtotal = cartTotal
  const shippingFee = subtotal >= 999 ? 0 : 99
  const total = subtotal + shippingFee

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name || '', email: user.email || '' }))
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setMessage('Please log in or create an account before placing an order.')
      return
    }

    if (cartProducts.length === 0) {
      setMessage('Your cart is empty. Add products before checking out.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          paymentMethod: form.paymentMethod,
          items: cartProducts.map((item) => ({ productId: item.id, quantity: item.quantity })),
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data?.message || 'Order could not be placed')
      }

      clearCart()
      setMessage(`Order placed successfully! Your order number is ${data?.order?.orderNumber || 'BX-001'}.`)
      setForm(initialForm)
    } catch (error) {
      setMessage(error.message || 'Something went wrong while placing the order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-16 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-6 md:p-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-accent-purple">Secure checkout</p>
              <h1 className="mt-2 font-display text-3xl font-bold">Complete your order</h1>
              <p className="mt-2 text-sm text-gray-400">
                Fill in your details and place the order in seconds.
              </p>
            </div>

            {message && (
              <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${message.includes('successfully') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <input
                  required
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  placeholder="PIN code"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>

              <input
                required
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                placeholder="Address line 1"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />
              <input
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="Address line 2 (optional)"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <input
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="State"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Payment method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="cod">Cash on delivery</option>
                  <option value="card">Card / UPI (demo)</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? 'Placing order...' : 'Place order'}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent-orange" />
                <h2 className="font-display text-xl font-semibold">Order summary</h2>
              </div>

              {cartProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-gray-400">
                  Your cart is empty. Add a few products and come back here.
                </div>
              ) : (
                <div className="space-y-3">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3 text-sm">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-gray-400">Qty {item.quantity}</p>
                      </div>
                      <span className="text-accent-orange">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 text-base font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 text-sm text-gray-300">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-accent-purple" />
                <span className="font-medium">Safe and secure</span>
              </div>
              <p className="mt-3 leading-6 text-gray-400">
                Your data is protected and orders are processed through the BazaarX backend API.
              </p>

              <div className="mt-4 flex items-center gap-2 text-gray-300">
                <Truck className="h-4 w-4 text-accent-orange" />
                <span>Fast delivery for all orders across India.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
