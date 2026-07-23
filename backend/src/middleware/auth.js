import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import User from '../models/User.js'

export function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

export async function protect(req, _res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Not authorized — login required'))
  }

  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return next(new ApiError(401, 'User no longer exists'))
    req.user = user
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}
