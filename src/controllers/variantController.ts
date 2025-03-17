import { Request, Response } from "express";
import Variant from "../models/Variant";
import { variationSchema } from "../utils/zodSchema";

export const getVariants = async(req: Request, res: Response): Promise<any> => {
    try {
        const variants = await Variant.find().populate({
            path: 'productId',
            select: 'name price description -_id'
        })

        console.log(variants);
        

        return res.status(200).json({
            success: true,
            message: 'Get data success',
            total: variants.length,
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

export const createVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const parse = variationSchema.safeParse(req.body);

        if (!parse.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request',
                details: parse.error.issues.map((err) => err.message),
            });
        }

        const { productId, size, color, stock } = parse.data;

        // Cek apakah varian sudah ada
        const existingVariant = await Variant.findOne({ productId, size, color });

        if (existingVariant) {
            return res.status(400).json({
                success: false,
                message: 'Variant already exists',
            });
        }

        // Jika varian belum ada, buat varian baru
        const newVariant = new Variant({ productId, size, color, stock });
        await newVariant.save();

        return res.status(201).json({
            success: true,
            message: 'Created new variant',
            data: newVariant,
        });

    } catch (error) {
        console.error('Error creating variant:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create variant',
        });
    }
};

export const updateVariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Validasi request body dengan Zod
        const parseResult = variationSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request data',
                errors: parseResult.error.format(), // Menampilkan error dalam format yang lebih rapi
            });
        }

        const { size, color, stock } = parseResult.data; // Data yang sudah tervalidasi

        // Cari varian berdasarkan ID
        const variant = await Variant.findById(id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found',
            });
        }

        // Update hanya field yang dikirim
        if (size) variant.size = size;
        if (color) variant.color = color;
        if (stock !== undefined) variant.stock = stock;

        // Simpan perubahan ke database
        await variant.save();

        return res.status(200).json({
            success: true,
            message: 'Variant updated successfully',
            data: variant,
        });

    } catch (error) {
        console.error('Error updating variant:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update variant',
        });
    }
};


export const deleteVariant = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const variant = await Variant.findById(id)

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found',
                data: null
            })
        }

        await Variant.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: 'Delete variant success',
            data: variant
        })
    } catch (error) {
        console.error('Error updating variant:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete variant',
        });
    }
}


