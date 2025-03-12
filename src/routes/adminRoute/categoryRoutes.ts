import express from 'express'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../controllers/categoryController'
import { validateRequest } from '../../middlewares/validateRequest'
import { categorychema } from '../../utils/zodSchema'

const categoryRoutes = express.Router()

categoryRoutes.get('/categories', getCategory)
categoryRoutes.post('/categories', validateRequest(categorychema), createCategory)
categoryRoutes.put('/categories/:id', validateRequest(categorychema) ,updateCategory)
categoryRoutes.delete('/categories/:id', deleteCategory)

export default categoryRoutes