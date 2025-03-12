import { Request, Response } from "express";
import SubCategory from "../models/SubCategory";
import { subCategorySchema } from "../utils/zodSchema";
import { z } from "zod";

type SubCategoryData = z.infer<typeof subCategorySchema>;

export const getSubCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const subCategory = await SubCategory.find().populate({
            path: 'category',
            select: 'name -_id'
        })

        return res.status(200).json({
            success: true,
            message: 'Get data success',
            data: subCategory
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

export const createSubCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as unknown as SubCategoryData;

        const subCategory = new SubCategory({
            name: body.name,
            category: body.category,
            product: body.product
        })

        const newData = await subCategory.save()

        return res.status(201).json({
            succes: true,
            message: 'Success create data',
            data: newData
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

export const updateSubCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const body = subCategorySchema.parse(req.body)

        await SubCategory.findByIdAndUpdate(id, {
            name: body.name,
            category: body.category,
            product: body.product
        })

        const updateSubCategory = await SubCategory.findById(id)

        return res.status(200).json({
            succes: true,
            message: 'Success update data',
            data: updateSubCategory
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed update data',
            data: null
        })
    }
}

const deleteSubCategory = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const deleteSubCategory = await SubCategory.findById(id)

        await SubCategory.findByIdAndDelete(id)

        return res.status(200).json({
            succes: true,
            message: 'Success delete data',
            data: deleteSubCategory
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: 'failed delete data',
            data: null
        })
    }
}