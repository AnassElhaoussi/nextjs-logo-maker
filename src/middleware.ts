import { NextRequest, NextResponse } from "next/server";
import { isAuthValid } from "./zod/validator";
import { ReqBodyType } from "./types";
import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";

// A custom function that returns the session object and a boolean to check if the user is authenticated
export const getSessionData = async () => {
    const session = await getServerSession(authOptions)
    return {
        authenticated: !!session,
        session
    }
}

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
    // Another middleware that fires whenever a user tries to access the dashboard page
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        // Getting the session data from the exported function
        const sessionData = await getSessionData()
        if (!sessionData.authenticated) {
            // Redirecting the user to the /register route if he's not authenticated
            return NextResponse.redirect(new URL('/register', req.nextUrl))
        }
        return NextResponse.next()
    }
}
