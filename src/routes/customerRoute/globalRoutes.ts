import express from 'express'
import { getCategories, getProducts, getSubCategories } from '../../controllers/globalController'
import { addToCart } from '../../controllers/cartController'

const globalRoutes = express.Router()

globalRoutes.get('/category', getCategories)
globalRoutes.get('/sub-categories', getSubCategories)
globalRoutes.get('/products', getProducts)
globalRoutes.post('/add-to-cart', addToCart)

export default globalRoutes