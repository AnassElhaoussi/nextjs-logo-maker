import { NextResponse } from "next/server"

import type { NextApiRequest, NextApiResponse } from "next"
import isAuthValid from "@/app/zod/validator"
import { ZodError } from "zod"

export default function middleware(req: NextApiRequest) {
    const { valid, error }: {
        valid: boolean,
        error: ZodError<{ email: string, password: string }> | null
    } = isAuthValid(req.body)
    if (!valid) {
        NextResponse.json({
            status: 400,
            message: "Invalid request",
            errors: error?.errors
        })
    } else NextResponse.next()
}