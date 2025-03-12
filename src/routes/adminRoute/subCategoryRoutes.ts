import express from 'express'
import { createSubCategory, getSubCategory, updateSubCategory } from '../../controllers/subCategoryControler'

const subCategoryRoutes = express.Router()

subCategoryRoutes.get('/sub-categories', getSubCategory)
subCategoryRoutes.post('/sub-categories', createSubCategory)
subCategoryRoutes.put('/sub-categories/:id', updateSubCategory)

export default subCategoryRoutes