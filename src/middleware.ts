import { NextRequest, NextResponse } from "next/server";
import { isAuthValid } from "./zod/validator";
import { ReqBodyType } from "./types";
import {withAuth} from 'next-auth/middleware'

// Middleware function for user credentials validation (fires before the request is sent)
export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/register')) {
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
    // An authorization middleware that fires whenever a user tries to access the dashboard page
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        withAuth({
            callbacks: {
                authorized: ({token}) => !!token, 
            },
            pages: {
                signIn: "/login",
            }
        })
    }
}
