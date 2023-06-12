import { NextResponse } from "next/server";
import { isAuthValid } from "./zod/validator";
import { ZodError } from "zod"
import { ReqBodyType } from "./types";

export function middleware(req: Request) {
        const { valid, error }: {
            valid: boolean,
            error: ZodError<{ email: string, password: string }> | null
        } = isAuthValid(req.body as ReqBodyType)
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

export const config = {
    matcher: '/api/register'
}