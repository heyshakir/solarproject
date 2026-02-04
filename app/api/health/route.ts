import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const start = Date.now()
        await prisma.$connect()
        const userCount = await prisma.user.count()
        const duration = Date.now() - start

        return NextResponse.json({
            status: "ok",
            database: "connected",
            userCount,
            latency: `${duration}ms`
        })
    } catch (error) {
        console.error("Health Check Failed:", error)
        return NextResponse.json({
            status: "error",
            message: "Database connection failed",
            error: String(error)
        }, { status: 500 })
    }
}
