"use client";

import { motion } from "framer-motion";
import { BlogCard } from "@/components/features/blog/BlogCard";

const FEATURED_POSTS = [
    {
        id: "1",
        title: "The Future of AI in Creative Design",
        excerpt: "How generative AI is reshaping the landscape of digital art and user interface design.",
        category: "Technology",
        date: "Feb 2, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
        slug: "future-ai-design",
    },
    {
        id: "2",
        title: "Minimalism: Less is More",
        excerpt: "Exploring the principles of minimalist architecture and how they apply to modern web development.",
        category: "Design",
        date: "Jan 28, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop",
        slug: "minimalism-less-is-more",
    },
    {
        id: "3",
        title: "Sustainable Tech for 2030",
        excerpt: "Green technologies that are set to revolutionize the industry in the next decade.",
        category: "Sustainability",
        date: "Jan 25, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
        slug: "sustainable-tech",
    },
];

export function FeaturedBlogs({ posts }: { posts: any[] }) {
    if (!posts || posts.length === 0) return null; // Or show skeleton/empty state

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
                        >
                            Featured Stories
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground"
                        >
                            Hand-picked articles for you
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={{
                            ...post,
                            // Map DB fields to UI fields if necessary
                            category: post.category?.name || "Uncategorized",
                            readTime: "5 min read", // Placeholder until we store it
                            date: new Date(post.createdAt).toLocaleDateString()
                        }} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
