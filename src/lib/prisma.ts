import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient}

export const prisma = 
    globalForPrisma.prisma ||
    typeof window === undefined && new PrismaClient({
        log: ["query"]
    })

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma