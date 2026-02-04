"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sun, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EnquiryModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSuccess(false);
            setOpen(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background/60 backdrop-blur-xl border-primary/20 shadow-2xl">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-10 space-y-4"
                        >
                            <div className="h-16 w-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                                <Sun className="h-8 w-8 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold">Query Received!</h3>
                            <p className="text-center text-muted-foreground">We'll get back to you shortly with some sunny news.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                    Join the Movement <Sun className="h-5 w-5 text-yellow-500" />
                                </DialogTitle>
                                <DialogDescription>
                                    Have questions about solar or want to partner with us? Reach out below.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="John Solar" required className="bg-background/50 border-primary/10 focus-visible:ring-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-primary/10 focus-visible:ring-primary/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Query Type</Label>
                                    <select
                                        id="type"
                                        className="flex h-10 w-full rounded-md border border-primary/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option>General Enquiry</option>
                                        <option>Solar Installation Support</option>
                                        <option>Partnership & Sales</option>
                                        <option>Media Query</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="How can we help you go green?" required className="min-h-[100px] bg-background/50 border-primary/10 focus-visible:ring-primary/50" />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Enquiry <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
