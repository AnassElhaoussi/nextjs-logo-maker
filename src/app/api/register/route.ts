import bcrypt from 'bcrypt'
import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import {Prisma} from '@prisma/client'


export async function POST(req: Request) {

    const saltRounds = 30
    // Getting the user's credentials from the request object
    const {email, password} = await req.json()
    // Generating the salt
    const salt = await bcrypt.genSalt(saltRounds)
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        // Creating a new user
        await prisma.user.create({
            email,
            password: hashedPassword
        })

        // Returning the response
        return NextResponse.json({
            status: 200,
            message: "successfully created the user!",
        })
    } catch(e) {
        // Checking if it's a unique constraint violation
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === "P2002") {
                return NextResponse.json({
                    status: 400,
                    error: "A user cannot be created with this email. This email already exists"
                })
            }
        }
        throw e
    }
}