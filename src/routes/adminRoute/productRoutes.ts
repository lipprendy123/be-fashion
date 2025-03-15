import express from 'express'
import { getDetailProduct, getProducts } from '../../controllers/productController'

const productRoutes = express.Router()

productRoutes.get('/products', getProducts)
productRoutes.get('/products/:id', getDetailProduct)

export default productRoutes