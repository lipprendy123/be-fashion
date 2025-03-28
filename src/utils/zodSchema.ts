import {z} from 'zod'

export const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']

export const categorychema = z.object({
    name: z.string().min(3),
    subCategories: z.array(z.string().min(5)).default([])
}).strict()

export const subCategorySchema = z.object({
    name: z.string().min(5),
    category: z.string().min(5),
    product: z.array(z.string().min(5)).min(1).optional()
}).strict()

export const variationSchema = z.object({
    productId: z.string().min(2).optional(),
    size: z.string().min(1, "Size is required").optional(),
    color: z.string().min(1, "Color is required").optional(),
    stock: z.number().min(0, "Stock must be at least 0").optional(),
}).strict()

export const productSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    price: z.number().min(0, "Price must be at least 0"),
    description: z.string().optional(),
    images: z.array(z.string()),
    variants: z.array(z.string()).min(1, 'At least one variant is required'),
}).strict()

export const authSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    role: z.enum(['admin', 'customer'])
}).strict()

export const cartSchema = z.object({
    userId: z.string().length(24, 'Invalid userId format'),
    productId: z.string().length(24, 'Invalid productId format'),
    qty: z.number().min(1, 'Quantity must be at least 1').default(1),
}).strict()