"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
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

                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-12 px-4 rounded-lg border border-input bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                            />
                        </div>
                        <Button size="lg" className="h-12 w-full sm:w-auto">
                            Subscribe <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-4">
                        No spam, unsubscribe at any time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
