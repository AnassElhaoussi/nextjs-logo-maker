import { z } from 'zod'
// Regex for the password
const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$"
// The error message for the password validation
const errorMessage = "Password must contain atleast one uppercase letter, one lowercase letter and one special character"
// creating zod schema
export const schema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .max(100)
        .regex(new RegExp(regex), errorMessage)
})
