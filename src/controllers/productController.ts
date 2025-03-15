import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async(req: Request, res: Response): Promise<any> => {
    try {
        const data = await Product.find()

        return res.status(200).json({
            success: true,
            message: 'get data success',
            data: data
        })
    } catch (error) {
        console.error('Error get data', error)

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        })
    }
}

export const getDetailProduct = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const data = await Product.findById(id)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Data product not found',
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Get data success',
            data: data
        })
    } catch (error) {
        console.error('Error get data', error)

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        })
    }
}