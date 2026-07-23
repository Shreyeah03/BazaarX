import { Router } from 'express'
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  syncWishlist,
} from '../controllers/wishlistController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/', getWishlist)
router.post('/sync', syncWishlist)
router.post('/:productId', addToWishlist)
router.delete('/:productId', removeFromWishlist)

export default router
