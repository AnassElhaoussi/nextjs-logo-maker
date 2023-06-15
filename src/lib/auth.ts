import prisma from "./prisma";
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
                            user.hashedPassword
                        )
                    if (!isPasswordValid) return null
                    return {
                        id: user.id,
                        username: "",
                        email: user.email
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
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                };
            }
            return token;
        },
    }
}