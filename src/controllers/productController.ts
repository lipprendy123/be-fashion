import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../utils/zodSchema";

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

export const createProduct = async (req: Request, res: Response): Promise<any> => {
	try {
		// ✅ Cek apakah ada file yang diunggah
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
                data: null
            });
        }
        
        const imagePaths = req.files.map((file) => file.filename);

		// ✅ Parsing body request dengan zod, konversi images ke array jika belum berbentuk array
		const parse = productSchema.safeParse({
			name: req.body.name,
			price: Number.parseInt(req.body.price),
			description: req.body.description,
			variant: req.body.variant,
			images: imagePaths, // Pastikan ini array
		});

		if (!parse.success) {
			const errMessages = parse.error.issues.map((err) => err.message);

			return res.status(400).json({
				message: "Invalid request",
				details: errMessages,
				status: "failed",
			});
		}

		// ✅ Buat product baru
		const product = new Product({
			name: parse.data.name,
			price: parse.data.price,
			images: parse.data.images, // Ini sudah array
			description: parse.data.description,
			variant: parse.data.variant,
		});

		await product.save();

		return res.status(201).json({
			success: true,
			message: "Create data success",
			data: product,
		});
	} catch (error) {
		console.error("Error create data", error);

		return res.status(500).json({
			success: false,
			message: "Internal server error",
			data: null,
		});
	}
};

