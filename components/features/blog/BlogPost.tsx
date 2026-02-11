"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, Twitter, Linkedin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReadingProgressBar } from "@/components/ui/reading-progress-bar";
import ReactMarkdown from "react-markdown";

interface BlogPostProps {
    post: {
        title: string;
        content: string;
        image: string | null;
        createdAt: Date;
        category: { name: string } | null;
        author?: { name: string; image: string | null } | null; // Optional if we add authors later
    };
}

export function BlogPost({ post }: BlogPostProps) {
    return (
        <div className="bg-background min-h-screen pb-20">
            <ReadingProgressBar />

            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <Image
                    src={post.image || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute top-8 left-4 md:left-8">
                    <Button variant="secondary" size="sm" asChild className="backdrop-blur-md bg-background/50 hover:bg-background/80">
                        <Link href="/blogs">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container max-w-4xl px-4 md:px-6 -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 md:p-10 shadow-xl"
                >
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                            {post.category?.name || "General"}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-border/50 pb-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                                {/* <Image src="..." alt="Author" fill /> */}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">SolarFlow Editor</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full"><Linkedin className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_a]:text-primary [&_a]:underline [&_a]:font-medium">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
