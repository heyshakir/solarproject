"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        await signIn("auth0", { callbackUrl: "/admin/dashboard" });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
                    <p className="text-sm text-muted-foreground mt-2">Sign in via Auth0 to access the dashboard</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleLogin}
                        className="w-full h-11"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Redirecting...
                            </>
                        ) : (
                            "Sign In with Auth0"
                        )}
                    </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    &copy; 2026 SolarFLow Inc. Restricted Access.
                </p>
            </motion.div>
        </div>
    );
}
