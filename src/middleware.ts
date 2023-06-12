import { NextResponse } from "next/server";
import { isAuthValid } from "./zod/validator";
import { ZodError } from "zod"
import { ReqBodyType } from "./types";

// Middleware function for user credentials validation (fires before the request is sent)
export function middleware(req: Request) {
        const { valid, error }: {
            valid: boolean,
            error: ZodError<{ email: string, password: string }> | null
        } = isAuthValid(req.body as ReqBodyType)
        // Checking if the user's credentials are valid
        if (!valid) {
            return NextResponse.json({
                status: 400,
                message: "Invalid request!",
                errors: error?.errors
            })
        } else {
            return NextResponse.next()
        }
}

// Matching the middleware to /api/register
export const config = {
    matcher: '/api/register'
}