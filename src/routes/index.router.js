import { Router } from 'express'
import cartRouter from './cart.router.js'
import productRouter from './products.router.js'
import userRouter from './user-router.js'

const router = Router()

router.use('/api',userRouter.getRouter())
router.use('/api/products', productRouter.getRouter())
router.use('/api/carts', cartRouter.getRouter())
router.use((req, res) => res.status(404).send({ status: 'error', message: 'Ruta no encontrada' }))

export default router