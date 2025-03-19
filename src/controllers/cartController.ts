import { Request, Response } from "express";
import { cartSchema } from "../utils/zodSchema";
import Product from "../models/Product";
import Cart from "../models/Cart";
import { CustomRequest } from "../types/Request";
import { ZodError } from "zod";

export const addToCart = async(req: CustomRequest, res: Response): Promise<any> => {
    try {
        const parse = cartSchema.parse(req.body)
        const {userId, productId, qty} = parse

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                data: null
            })
        }

        let cart = await Cart.findOne({userId})

        if (!cart) {
            cart = new Cart({userId, items: [{productId, qty}] })
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId))

            if (itemIndex > 1) {
                cart.items[itemIndex].qty += qty
            } else {
                cart.items.push({productId, qty})
            }
        }

        await cart.save()

        return res.status(201).json({
            success: true,
            message: 'Success add to cart',
            data: cart
        })

    } catch (error: any) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors
            })
        }

        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
} 