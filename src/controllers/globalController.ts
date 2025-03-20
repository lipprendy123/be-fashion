import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import SubCategory from "../models/SubCategory";

export const getCategories = async(req: Request, res: Response): Promise<any> => {
    try {
        const categories = await Category.find().select('name')

        return res.status(200).json({
            success: true,
            message: 'Get data categories success',
            data: categories
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'Get data failed',
            data: null
        })
    }
}

export const getSubCategories = async(req: Request, res: Response): Promise<any> => {
    try {
        const subCategories = await SubCategory.find().populate({
            path: 'products',
            select: 'images name price -_id'
        })

        return res.status(200).json({
            success: true,
            message: 'Get data categories success',
            data: subCategories
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'Get data failed',
            data: null
        })
    }
}

export const getProducts = async(req: Request, res: Response): Promise<any> => {
    try {
        const products = await Product.find().select('name price images -_id')

        return res.status(200).json({
            success: true,
            message: 'Get data categories success',
            data: products
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'Get data failed',
            data: null
        })
    }
}

export const getDetailProduct = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const detailProduct = await Product.findById(id).select('images name description price -_id').populate({
            path: 'variant',
            select: 'size color -_id'
        })

        return res.status(200).json({
            success: true,
            message: 'Success get detail product',
            data: detailProduct
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'Get data failed',
            data: null
        })
    }
}