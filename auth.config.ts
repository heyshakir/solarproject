import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig;
