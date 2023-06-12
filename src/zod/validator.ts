import { schema } from "."
import { ReqBodyType } from "@/types"

export function isAuthValid(body: ReqBodyType) {
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




