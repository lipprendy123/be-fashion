import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../utils/zodSchema";
import path from 'path'
import fs from "fs";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = await Product.find().populate({
        path: 'variants',
        select: 'size color stock -_id'
    });
    console.log("Product with populated variant:", data);

    return res.status(200).json({
      success: true,
      message: "get data success",
      total: data.length,
      data: data,
    });
  } catch (error) {
    console.error("Error get data", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const getDetailProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const data = await Product.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data product not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get data success",
      data: data,
    });
  } catch (error) {
    console.error("Error get data", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

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

      // ✅ Parsing body request dengan zod
      const parse = productSchema.safeParse({
          name: req.body.name,
          price: Number.parseInt(req.body.price),
          description: req.body.description,
          variants: req.body.variants ? req.body.variants.split(',') : [], // Tambahkan pengecekan null/undefined
          images: imagePaths,
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
          images: parse.data.images,
          description: parse.data.description,
          variants: parse.data.variants,
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

export const deleteProduct = async(req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                data: null
            })
        }

        if (product.images && product.images.length > 0) {
            await Promise.all(
              product.images.map(async (image) => {
                const imagePath = path.join(__dirname, "../../public/uploads/products", image);
                if (fs.existsSync(imagePath)) {
                  await fs.promises.unlink(imagePath);
                }
              })
            );
          }          

        await Product.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: 'Delete data success',
            data: product
        })
    } catch (error) {
        console.error("Error delete data", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
}