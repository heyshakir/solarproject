import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    debug: true,
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                console.log("Authorize callback invoked");
                console.log("Credentials received:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    });

                    console.log("User DB lookup result:", user ? "Found" : "Not Found");

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    console.log("Password comparison result:", passwordsMatch);

                    if (!passwordsMatch) {
                        console.log("Password mismatch");
                        return null;
                    }

                    console.log("Login successful for:", user.email);
                    return { id: user.id, name: user.name, email: user.email };
                } catch (dbError) {
                    console.error("Database error in authorize:", dbError);
                    return null;
                }
            }
        })
    ],
});

