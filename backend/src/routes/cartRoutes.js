import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart,
} from '../controllers/cartController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/', getCart)
router.post('/sync', syncCart)
router.post('/items', addToCart)
router.patch('/items/:productId', updateCartItem)
router.delete('/items/:productId', removeFromCart)
router.delete('/', clearCart)

export default router
