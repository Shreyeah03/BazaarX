import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { signToken } from '../middleware/auth.js'
import User from '../models/User.js'

function userResponse(user) {
  return { id: user._id, name: user.name, email: user.email, addresses: user.addresses || [] }
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required')
  }
  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters')
  }

  const exists = await User.findOne({ email })
  if (exists) throw new ApiError(409, 'Email already registered')

  const user = await User.create({ name, email, password })
  const token = signToken(user._id)

  res.status(201).json({ success: true, token, user: userResponse(user) })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw new ApiError(400, 'Email and password are required')

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = signToken(user._id)
  res.json({ success: true, token, user: userResponse(user) })
})

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: userResponse(req.user) })
})

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, addresses } = req.body
  if (name) req.user.name = name
  if (addresses) req.user.addresses = addresses
  await req.user.save()
  res.json({ success: true, user: userResponse(req.user) })
})
