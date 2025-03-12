import express from 'express'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../controllers/categoryController'

const categoryRoutes = express.Router()

categoryRoutes.get('/categories', getCategory)
categoryRoutes.post('/categories', createCategory)
categoryRoutes.put('/categories/:id', updateCategory)
categoryRoutes.delete('/categories/:id', deleteCategory)

export default categoryRoutes