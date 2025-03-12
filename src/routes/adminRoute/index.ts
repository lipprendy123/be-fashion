import express from 'express'
import categoryRoutes from './categoryRoutes'
import subCategoryRoutes from './subCategoryRoutes'

const adminRoutes = express.Router()

adminRoutes.use(categoryRoutes)
adminRoutes.use(subCategoryRoutes)

export default adminRoutes