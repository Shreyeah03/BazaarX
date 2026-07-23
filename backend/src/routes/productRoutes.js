import { Router } from 'express'
import {
  getProducts,
  getProductById,
  getTrending,
  getFeatured,
  getCategories,
  getRelated,
} from '../controllers/productController.js'

const router = Router()

router.get('/', getProducts)
router.get('/categories', getCategories)
router.get('/trending', getTrending)
router.get('/featured', getFeatured)
router.get('/:id/related', getRelated)
router.get('/:id', getProductById)

export default router
