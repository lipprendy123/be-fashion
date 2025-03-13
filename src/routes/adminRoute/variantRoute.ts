import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { variationSchema } from '../../utils/zodSchema';
import { createVariant, deleteVariant, getVariants, updateVariant } from '../../controllers/variantController';

const variantRoutes = express.Router()

variantRoutes.get('/variants', getVariants)
variantRoutes.post('/variants', validateRequest(variationSchema), createVariant)
variantRoutes.put('/variants/:id', validateRequest(variationSchema), updateVariant)
variantRoutes.delete('/variants/:id', deleteVariant)

export default variantRoutes