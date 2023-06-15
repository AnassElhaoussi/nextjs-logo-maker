import { NextResponse } from "next/server";
import { isAuthValid } from "./zod/validator";
import { ZodError } from "zod"
import { ReqBodyType } from "./types";

// Middleware function for user credentials validation (fires before the request is sent)
export async function middleware(req: Request) {
    // Getting the request body
    const body = await req.json()
    const { valid, error }: {
        valid: boolean,
        error: string | null
    } = isAuthValid(body as ReqBodyType)
    // Checking if the user's credentials are valid

    if (!valid) {
        return NextResponse.json({
            message: "Invalid request!",
            error
        }, {
            status: 400
        })
    } else {
        return NextResponse.next()
    }
}

// Matching the middleware to /api/register
export const config = {
    matcher: '/api/register'
}