import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    debug: true,
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    providers: [
        Auth0({
            clientId: process.env.AUTH_AUTH0_ID,
            clientSecret: process.env.AUTH_AUTH0_SECRET,
            issuer: process.env.AUTH_AUTH0_ISSUER,
        })
    ],
});
