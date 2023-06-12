import { schema } from "."
export default function isAuthValid(
    body: {
        email: string,
        password: string
    }) {
    const response = schema.safeParse(body)
    if (!response.success) {
        return {
            valid: false,
            error: response.error
        }
    } else {
        return {
            valid: true,
            error: null
        }
    }
}




