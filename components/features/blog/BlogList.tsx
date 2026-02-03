"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { BlogCard } from "@/components/features/blog/BlogCard";

// Mock Data
const ALL_POSTS = [
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
    {
        id: "4",
        title: "Understanding React Server Components",
        excerpt: "A deep dive into the architecture of RSC and how it improves performance.",
        category: "Programming",
        date: "Jan 20, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
        slug: "react-server-components",
    },
    {
        id: "5",
        title: "The Rise of No-Code Tools",
        excerpt: "Can you really build a SaaS without writing code? We explore the limits.",
        category: "Business",
        date: "Jan 18, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
        slug: "no-code-rise",
    },
    {
        id: "6",
        title: "Remote Work Culture",
        excerpt: "Tips and tricks for maintaining productivity and mental health while working from home.",
        category: "Lifestyle",
        date: "Jan 15, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1593642632823-8f7853670c40?q=80&w=1000&auto=format&fit=crop",
        slug: "remote-work",
    },
];

const CATEGORIES = ["All", "Technology", "Design", "Programming", "Business", "Lifestyle", "Sustainability"];

export function BlogList() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const filteredPosts = ALL_POSTS.filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-10">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                        >
                            {selectedCategory === cat && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-primary rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BlogCard post={post} index={index} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground"
                        >
                            <p>No articles found.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Infinite Scroll Trigger (Visual) */}
            <div className="flex justify-center py-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading more...
                </div>
            </div>
        </div>
    );
}
