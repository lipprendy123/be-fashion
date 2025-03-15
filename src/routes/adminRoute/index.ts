import express from 'express'
import categoryRoutes from './categoryRoutes'
import subCategoryRoutes from './subCategoryRoutes'
import variantRoutes from './variantRoute'
import productRoutes from './productRoutes'

const adminRoutes = express.Router()

adminRoutes.use(categoryRoutes)
adminRoutes.use(subCategoryRoutes)
adminRoutes.use(variantRoutes)
adminRoutes.use(productRoutes)

export default adminRoutes