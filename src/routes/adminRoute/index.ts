import express from 'express'
import categoryRoutes from './categoryRoutes'
import subCategoryRoutes from './subCategoryRoutes'
import variantRoutes from './variantRoute'

const adminRoutes = express.Router()

adminRoutes.use(categoryRoutes)
adminRoutes.use(subCategoryRoutes)
adminRoutes.use(variantRoutes)

export default adminRoutes