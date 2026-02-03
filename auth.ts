import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
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

                // Simple password check for demo (use distinct bcrypt in prod)
                if (user.password !== credentials.password) {
                    console.log("Password mismatch");
                    return null;
                }

                console.log("Login successful for:", user.email);
                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith("/admin");
            const isLoginPage = nextUrl.pathname.startsWith("/admin/login");

            if (isAdminPage) {
                if (isLoginPage) return true;
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
});
