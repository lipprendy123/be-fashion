import express from 'express'
import categoryRoutes from './categoryRoutes'
import subCategoryRoutes from './subCategoryRoutes'
import variantRoutes from './variantRoute'
import productRoutes from './productRoutes'
import { verifyRole, verifyToken } from '../../middlewares/verifyToken'

const adminRoutes = express.Router()

adminRoutes.use(verifyToken)
adminRoutes.use(verifyRole('admin') as express.RequestHandler)
adminRoutes.use(categoryRoutes)
adminRoutes.use(subCategoryRoutes)
adminRoutes.use(variantRoutes)
adminRoutes.use(productRoutes)

export default adminRoutes