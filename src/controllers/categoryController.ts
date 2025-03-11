import { Request, Response } from "express";
import { categorychema } from "../utils/zodSchema";
import Category from "../models/Category";

export const getCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const data = await Category.find()

        return res.status(200).json({
            success: true,
            message: 'Get data success',
            data: data
        })
    } catch (error) {
       console.log(error);
                
        return res.status(500).json({
             success: false,
            message: 'Failed to get data',
            data: null
        })
    }
}

export const createCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const parse = categorychema.safeParse({
            name: req.body.name,
            subCategories: req.body.subCategories
        })

        if (!parse.success) {
            const errMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                message: 'Invalid request',
                details: errMessages,
                status: 'failed'
            })
        }

        const category = new Category({
            name: parse.data.name,
            subCategories: parse.data.subCategories
        })

        await category.save()

        return res.status(201).json({
            success: true,
            message: 'Create data success',
            data: category
        })

    } catch (error) {
        console.log(error);
                
        return res.status(500).json({
             success: false,
            message: 'Failed to get data',
            data: null
        })
    }
}

export const updateCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const body = categorychema.parse(req.body)

        await Category.findByIdAndUpdate(id, {
            name: body.name,
            subCategories: body.subCategories
        })

        const updateCategory = await Category.findById(id)

        return res.status(200).json({
            success: true,
            message: 'Update data success',
            data: updateCategory
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed to update data',
            data: null
        })
    }
}

export const deleteCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
                data: null
            })
        }

        await Category.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: 'Delete movie success',
            data: category
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed to delete data',
            data: null
        })
    }
}