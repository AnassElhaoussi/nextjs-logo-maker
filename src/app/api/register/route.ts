import bcrypt from 'bcrypt'
import {prisma} from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    
    const saltRounds = 6
    // Getting the user's credentials from the request object
    const { email, password } = await req.json()
    // Generating the salt
    const salt = await bcrypt.genSalt(saltRounds)
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        // Creating a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username: email.slice(0, email.indexOf("@")),
                profilePicture: ""
            }
        })

        // Returning the response
        return NextResponse.json({
            status: 200,
            message: "successfully created the user!",
            user: newUser
        }, { status: 200 })
    } catch (e) {
        // Checking if it's a unique constraint violation
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return NextResponse.json({
                    error: "A user cannot be created with this email. This email already exists"
                }, { status: 400 })
            }
        }
        return NextResponse.json({
            error: e
        }, {status: 400})
    }
}