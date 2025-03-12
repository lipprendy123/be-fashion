import express from 'express'
import { createSubCategory, getSubCategory, updateSubCategory } from '../../controllers/subCategoryControler'
import { subCategorySchema } from '../../utils/zodSchema'
import { validateRequest } from '../../middlewares/validateRequest'

const subCategoryRoutes = express.Router()

subCategoryRoutes.get('/sub-categories', getSubCategory)
subCategoryRoutes.post('/sub-categories', validateRequest(subCategorySchema) ,createSubCategory)
subCategoryRoutes.put('/sub-categories/:id', validateRequest(subCategorySchema) ,updateSubCategory)

export default subCategoryRoutes