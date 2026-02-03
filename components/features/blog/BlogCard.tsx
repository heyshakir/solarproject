"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    slug: string;
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <article className="flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {post.readTime}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors mb-2">
                            {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center text-sm font-medium text-primary mt-auto">
                            Read Article
                            <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
