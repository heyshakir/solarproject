import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        status: "checking_env_vars",
        env_check: {
            AUTH_SECRET: !!process.env.AUTH_SECRET ? "OK (Set)" : "MISSING",
            AUTH_AUTH0_ID: !!process.env.AUTH_AUTH0_ID ? "OK (Set)" : "MISSING",
            AUTH_AUTH0_SECRET: !!process.env.AUTH_AUTH0_SECRET ? "OK (Set)" : "MISSING",
            AUTH_AUTH0_ISSUER: process.env.AUTH_AUTH0_ISSUER, // Safe to show issuer URL
            AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
            NODE_ENV: process.env.NODE_ENV,
        },
        // Helpful hint
        message: "If any of these say MISSING, that is the cause of the 500 Server Error."
    });
}
