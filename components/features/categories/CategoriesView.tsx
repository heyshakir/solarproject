"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Globe, Briefcase, Coffee, Cpu, Megaphone, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/features/blog/BlogCard";

// Helpers to map dynamic categories to UI styles
const getCategoryStyle = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('tech') || lower.includes('ai') || lower.includes('program'))
        return { icon: Cpu, color: 'text-blue-500 bg-blue-500/10', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000' };
    if (lower.includes('design') || lower.includes('art'))
        return { icon: PenTool, color: 'text-pink-500 bg-pink-500/10', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000' };
    if (lower.includes('business') || lower.includes('market'))
        return { icon: Briefcase, color: 'text-emerald-500 bg-emerald-500/10', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000' };
    if (lower.includes('life') || lower.includes('cult'))
        return { icon: Coffee, color: 'text-orange-500 bg-orange-500/10', image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000' };

    return { icon: Globe, color: 'text-indigo-500 bg-indigo-500/10', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000' };
};

interface Post {
    id: string;
    title: string;
    excerpt: string | null;
    slug: string;
    image: string | null;
    createdAt: Date;
    category?: { name: string } | null;
}

interface Category {
    id: string;
    name: string;
    description: string | null;
    posts: Post[];
    _count?: { posts: number };
}

interface CategoriesViewProps {
    categories: Category[];
}

export function CategoriesView({ categories }: CategoriesViewProps) {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background pb-20 pt-24">
            <div className="container px-4 md:px-6">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Explore Topics
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        Dive into our curated collection of articles across various disciplines.
                    </motion.p>
                </div>

                {/* Categories Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
                >
                    {categories.map((cat) => {
                        const style = getCategoryStyle(cat.name);
                        const Icon = style.icon;

                        return (
                            <motion.div key={cat.id} variants={item}>
                                <Link href={`/blogs?category=${cat.name}`} className="group relative block h-[280px] overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-xl transition-all duration-300">
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={style.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-30"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-card/50 to-transparent opacity-90" />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full p-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-auto backdrop-blur-md bg-background/30 border border-white/10 ${style.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                                                {cat.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                {cat.description || `Explore the latest in ${cat.name}.`}
                                            </p>
                                            <div className="flex items-center text-xs font-medium text-primary/80 bg-primary/10 w-fit px-3 py-1 rounded-full">
                                                {cat._count?.posts || 0} Articles
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Latest Blogs by Category */}
                <div className="space-y-24">
                    {categories.map((cat, i) => {
                        if (cat.posts.length === 0) return null;
                        const style = getCategoryStyle(cat.name);

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${style.color}`}>
                                            <style.icon className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight">Latest in {cat.name}</h2>
                                    </div>
                                    <Button variant="ghost" asChild className="group">
                                        <Link href={`/blogs?category=${cat.name}`}>
                                            View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {cat.posts.map((post, index) => (
                                        <BlogCard
                                            key={post.id}
                                            post={{
                                                ...post,
                                                category: cat.name,
                                                readTime: "5 min read",
                                                excerpt: post.excerpt || "",
                                                date: new Date(post.createdAt).toLocaleDateString(),
                                                image: post.image || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000",
                                            }}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

import { Button } from "@/components/ui/button";
