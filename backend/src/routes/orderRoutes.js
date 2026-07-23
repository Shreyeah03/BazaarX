import { Router } from 'express'
import {
  createOrder,
  getOrders,
  getOrderById,
  confirmPayment,
  cancelOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/:id/pay', confirmPayment)
router.patch('/:id/cancel', cancelOrder)

export default router
