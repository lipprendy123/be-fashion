import {z} from 'zod'

export const categorychema = z.object({
    name: z.string().min(3),
    subCategories: z.array(z.string().min(5)).default([])
}).strict()

export const subCategorySchema = z.object({
    name: z.string().min(5),
    category: z.string().min(5),
    product: z.array(z.string().min(5)).min(1).optional()
}).strict()