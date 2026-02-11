"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { BlogCard } from "@/components/features/blog/BlogCard";
import { useSearchParams, useRouter } from "next/navigation";

// Types
interface Category {
    id: string;
    name: string;
    _count?: { posts: number };
}

interface Post {
    id: string;
    title: string;
    excerpt: string | null;
    slug: string;
    image: string | null;
    createdAt: Date;
    category: { name: string } | null;
}

interface BlogListProps {
    initialPosts: Post[];
    categories: Category[];
}

export function BlogList({ initialPosts, categories }: BlogListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get initial state from URL
    const urlCategory = searchParams.get("category") || "All";
    const urlSearch = searchParams.get("search") || "";

    const [selectedCategory, setSelectedCategory] = useState(urlCategory);
    const [searchQuery, setSearchQuery] = useState(urlSearch);

    // Filter posts based on local state (client-side filtering for responsiveness)
    const filteredPosts = initialPosts.filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category?.name === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Update URL when filters change (shallow routing)
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") params.set("category", selectedCategory);
        if (searchQuery) params.set("search", searchQuery);

        router.replace(`/blogs?${params.toString()}`, { scroll: false });
    }, [selectedCategory, searchQuery, router]);

    // Update local state if URL changes externally (e.g. navigation)
    useEffect(() => {
        const cat = searchParams.get("category") || "All";
        if (cat !== selectedCategory) setSelectedCategory(cat);
    }, [searchParams]);

    return (
        <div className="space-y-10">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "All"
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                    >
                        {selectedCategory === "All" && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-primary rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">All</span>
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.name
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                        >
                            {selectedCategory === cat.name && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-primary rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat.name}</span>
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
                                <BlogCard
                                    post={{
                                        ...post,
                                        category: post.category?.name || "Uncategorized",
                                        excerpt: post.excerpt || "",
                                        readTime: "5 min read", // Placeholder or calculate
                                        date: new Date(post.createdAt).toLocaleDateString(),
                                        image: post.image || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000", // Fallback
                                    }}
                                    index={index}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground"
                        >
                            <p>No articles found matching your criteria.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
