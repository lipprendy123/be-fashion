import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { authSchema } from '../utils/zodSchema';
import {loginUser, registerUser} from '../controllers/authController';
import multer from 'multer';
import { imageFilter, productStorage } from '../utils/multer';

const authRoutes = express.Router()

const upload = multer({
    storage: productStorage('public/uploads/photos'),
    fileFilter: imageFilter
})

authRoutes.post('/register', upload.single('photo'), registerUser);
authRoutes.post('/login', validateRequest(authSchema.omit({name: true})), loginUser);

export default authRoutes