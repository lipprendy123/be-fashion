import {z} from 'zod'

export const categorychema = z.object({
    name: z.string().min(5),
    subCategories: z.string().min(5)
}).strict()