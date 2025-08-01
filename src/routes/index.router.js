import { Router } from 'express'
import cartRouter from './cart.router.js'
import productRouter from './products.router.js'
import userRouter from './user-router.js'

const router = Router()

router.use('/api',userRouter.getRouter())
router.use('/api/products', productRouter.getRouter())
router.use('/api/carts', cartRouter.getRouter())

export default router