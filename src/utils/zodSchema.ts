import {z} from 'zod'

export const categorychema = z.object({
    name: z.string().min(5),
    subCategories: z.array(z.string().min(5)).min(1)
}).strict()