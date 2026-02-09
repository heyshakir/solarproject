"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
    id: string;
    name: string;
    _count?: {
        posts: number;
    };
}

interface CategoriesDropdownProps {
    categories: Category[];
    isMobile?: boolean;
    onClose?: () => void;
}

export function CategoriesDropdown({ categories, isMobile = false, onClose }: CategoriesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    // Desktop hover handlers
    const handleMouseEnter = () => !isMobile && setIsOpen(true);
    const handleMouseLeave = () => !isMobile && setIsOpen(false);

    if (isMobile) {
        return (
            <div className="flex flex-col w-full">
                <button
                    onClick={toggleOpen}
                    className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-primary transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Categories
                    </span>
                    <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4"
                        >
                            <div className="flex flex-col gap-2 py-2 border-l border-border/50 pl-4">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories?category=${encodeURIComponent(category.name)}`}
                                        onClick={onClose}
                                        className="text-sm text-foreground/80 hover:text-primary transition-colors py-1"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/categories"
                                    onClick={onClose}
                                    className="text-sm font-semibold text-primary/90 hover:text-primary pt-2 mt-1 border-t border-border/30"
                                >
                                    View All Categories
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href="/categories"
                className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80",
                    isOpen ? "text-foreground" : "text-foreground/60"
                )}
            >
                Categories
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} />
            </Link>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 p-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl z-50 ring-1 ring-border/50"
                    >
                        {/* Decorative arrow - adjusted position */}
                        <div className="absolute -top-1.5 left-8 w-3 h-3 bg-background border-t border-l border-border/50 rotate-45" />

                        <div className="relative flex flex-col gap-1">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories?category=${encodeURIComponent(category.name)}`}
                                    className="block px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                                >
                                    <div className="font-medium group-hover:text-primary transition-colors">
                                        {category.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50 text-center">
                            <Link
                                href="/categories"
                                className="text-xs font-semibold text-primary hover:underline"
                            >
                                View All Categories
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
