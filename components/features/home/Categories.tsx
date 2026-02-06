"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "@prisma/client";

interface CategoriesProps {
    categories?: Category[];
}

export function Categories({ categories = [] }: CategoriesProps) {
    if (!categories.length) return null;

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Explore Topics</h2>
                    <p className="text-muted-foreground text-sm">Find what sparks your interest</p>
                </div>

                {/* Horizontal Scroll Area */}
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x justify-start md:justify-center scrollbar-hide"
                        drag="x"
                        dragConstraints={{ left: -500, right: 0 }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {categories.map((cat, index) => (
                            <Link key={cat.id} href={`/blogs?category=${encodeURIComponent(cat.name)}`}>
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-shrink-0 px-6 py-3 rounded-full bg-background border border-border shadow-sm text-sm font-medium hover:border-primary hover:text-primary transition-colors snap-center whitespace-nowrap"
                                >
                                    {cat.name}
                                </motion.button>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
