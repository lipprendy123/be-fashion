import { Request, Response } from "express";
import Variant from "../models/Variant";
import { variationSchema } from "../utils/zodSchema";

export const getVariants = async(req: Request, res: Response): Promise<any> => {
    try {
        const variants = await Variant.find()

        return res.status(200).json({
            success: true,
            message: 'Get data success',
            data: variants
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed get data',
            data: null
        })
    }
}

export const createProduct = async(req: Request, res: Response): Promise<any> => {
    try {
        const parse = variationSchema.safeParse(req.body)

        if (!parse.success) {
            const errMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: 'Invalid request',
                details: errMessages,
                status: 'failed'
            })
        }

        const { productId, size, color } = parse.data; 

        const existingVariant = await Variant.findOne({productId, size, color})

        if (existingVariant) {
            return res.status(400).json({ message: "Variant already exists" });
        }

        const variant = new Variant({
            productId: parse.data.productId,
            size: parse.data.size,
            color: parse.data.color,
            stock: parse.data.stock
        })

        await variant.save()

        return res.status(201).json({
            success: true,
            message: 'Created data success',
            data: variant
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed create data',
            data: null
        })
    }
}