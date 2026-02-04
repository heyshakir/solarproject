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
                console.log("Authorize attempt with:", credentials.email);
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                console.log("User found:", user ? "Yes" : "No");

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordsMatch) {
                    console.log("Password mismatch");
                    return null;
                }

                console.log("Login successful for:", user.email);
                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
});

