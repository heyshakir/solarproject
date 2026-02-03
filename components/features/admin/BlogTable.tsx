"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
    id: string;
    title: string;
    published: boolean;
    createdAt: Date;
    category?: { name: string } | null;
}

interface BlogTableProps {
    posts: Post[];
}

export function BlogTable({ posts }: BlogTableProps) {
    return (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No posts found. Start by creating one!
                                </td>
                            </tr>
                        ) : (
                            posts.map((blog, index) => (
                                <motion.tr
                                    key={blog.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-muted/30 transition-colors group"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground">{blog.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{blog.category?.name || "Uncategorized"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${blog.published ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
                                            {blog.published ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-500">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-amber-500">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span>Showing {posts.length} results</span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled={posts.length < 10}>Next</Button>
                </div>
            </div>
        </div>
    );
}
