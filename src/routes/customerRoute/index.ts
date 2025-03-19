import express from 'express';
import globalRoutes from './globalRoutes';

const customerRoutes = express.Router()

customerRoutes.use(globalRoutes)

export default customerRoutes