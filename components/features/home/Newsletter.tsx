"use client";

import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus('loading');
        setMessage("");

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus('error');
                setMessage(data.error || "Something went wrong.");
            } else {
                setStatus('success');
                setMessage("Thanks for subscribing!");
                setEmail("");
            }
        } catch (error) {
            setStatus('error');
            setMessage("Failed to connect. Please try again.");
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-0" />


            <div className="container relative z-10 px-4 md:px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Stay in the loop
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Join our newsletter to get the latest insights, tutorials, and trends delivered explicitly to your inbox.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full h-12 px-4 rounded-lg border border-input bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground disabled:opacity-50"
                            />
                        </div>
                        <Button
                            size="lg"
                            className="h-12 w-full sm:w-auto"
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : status === 'success' ? (
                                <>Subscribed <CheckCircle className="ml-2 h-4 w-4" /></>
                            ) : (
                                <>Subscribe <Send className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>
                    </form>

                    {/* Status Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 text-sm flex items-center justify-center gap-2 ${status === 'error' ? 'text-red-500' : 'text-green-500'
                                }`}
                        >
                            {status === 'error' ? (
                                <AlertCircle className="h-4 w-4" />
                            ) : (
                                <CheckCircle className="h-4 w-4" />
                            )}
                            {message}
                        </motion.div>
                    )}

                    {!message && (
                        <p className="text-xs text-muted-foreground mt-4">
                            No spam, unsubscribe at any time.
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
