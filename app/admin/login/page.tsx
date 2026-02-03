"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authenticate } from "@/lib/actions";

export default function AdminLogin() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

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
                    <p className="text-sm text-muted-foreground mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form action={dispatch} className="space-y-4">
                    <FloatingLabelInput id="email" name="email" label="Email Address" type="email" required />
                    <FloatingLabelInput id="password" name="password" label="Password" type="password" required />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                            <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                            Remember me
                        </label>
                        <Link href="#" className="text-primary hover:underline underline-offset-4">Forgot password?</Link>
                    </div>

                    <div className="text-red-500 text-sm h-4">
                        {errorMessage}
                    </div>

                    <LoginButton />
                </form>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    &copy; 2026 SolarFLow Inc. Restricted Access.
                </p>
            </motion.div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full h-11" type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                </>
            ) : (
                <>
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
            )}
        </Button>
    );
}
