import express from 'express'
import { createProduct, deleteProduct, getDetailProduct, getProducts } from '../../controllers/productController'
import multer from 'multer'
import { imageFilter, productStorage } from '../../utils/multer'

const productRoutes = express.Router()

const upload = multer({storage: productStorage(), fileFilter: imageFilter})

productRoutes.get('/products', getProducts)
productRoutes.get('/products/:id', getDetailProduct)
productRoutes.post('/products', upload.array('images', 5), createProduct)
productRoutes.delete('/products/:id', deleteProduct)

export default productRoutes