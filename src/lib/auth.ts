import {prisma} from './prisma'
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "Login",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@email.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: async (credentials) => {
                // Finding a unique user with the same email in the database
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (user) {
                    // Comparing the password entered and the hashed version on the db
                    const isPasswordValid = await bcrypt
                        .compare(
                            credentials?.password as string | Buffer,
                            user.password
                        )
                    if (!isPasswordValid) return null
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        profilePicture: user.profilePicture
                    } as any
                }
                return null
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    username: u.username,
                    id: u.id,
                    profilePicture: u.profilePicture
                };
            }
            return token;
        },
    }
}