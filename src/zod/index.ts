import { z } from 'zod'

// creating zod schema
export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
})
