"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { NavSearchBar } from "@/components/layout/NavSearchBar";
import { CategoriesDropdown } from "@/components/layout/CategoriesDropdown";

// Removed "Categories" from static items as it's now dynamic
const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
];

interface NavbarProps {
    categories?: { id: string; name: string; _count?: { posts: number } }[];
}

export function Navbar({ categories = [] }: NavbarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Sun className="h-6 w-6 text-orange-500" />
                    </motion.div>
                    <span className="text-lg font-bold tracking-tight">SolarFlow</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className={cn(
                            "relative text-sm font-medium transition-colors hover:text-foreground/80",
                            pathname === "/" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Home
                        {pathname === "/" && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                    </Link>

                    <Link
                        href="/blogs"
                        className={cn(
                            "relative text-sm font-medium transition-colors hover:text-foreground/80",
                            pathname === "/blogs" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Blogs
                        {pathname === "/blogs" && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                    </Link>

                    {/* Categories Dropdown */}
                    <CategoriesDropdown categories={categories} />

                    <Link
                        href="/about"
                        className={cn(
                            "relative text-sm font-medium transition-colors hover:text-foreground/80",
                            pathname === "/about" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        About
                        {pathname === "/about" && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <NavSearchBar />
                    <ThemeToggle />
                    <Button asChild size="sm" variant="default">
                        <Link href="/admin/login">Admin Portal</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden border-b border-border/40 bg-background px-4 py-4"
                >
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>

                        {/* Mobile Categories Dropdown */}
                        <div className="border-l-2 border-primary/20 pl-2">
                            <CategoriesDropdown
                                categories={categories}
                                isMobile={true}
                                onClose={() => setIsMobileMenuOpen(false)}
                            />
                        </div>

                        <Link
                            href="/about"
                            className="text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>

                        <NavSearchBar className="w-full" onSearch={() => setIsMobileMenuOpen(false)} />
                        <Button asChild size="sm" className="w-full">
                            <Link href="/admin/login">Admin Portal</Link>
                        </Button>
                    </nav>
                </motion.div>
            )}
        </header>
    );
}

