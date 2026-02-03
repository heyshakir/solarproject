"use client";

import { useState, useActionState, useRef, useEffect } from "react";
import { Bold, Italic, Link as LinkIcon, Image, List, Quote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost, updatePost } from "@/lib/actions";

interface Category {
    id: string;
    name: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    excerpt: string | null;
    image: string | null;
    published: boolean;
    featured: boolean;
    categoryId: string | null;
}

interface BlogEditorProps {
    categories: Category[];
    post?: Post | null;
}

export function BlogEditor({ categories, post }: BlogEditorProps) {
    const updatePostWithId = post ? updatePost.bind(null, post.id) : createPost;
    const [state, formAction, isPending] = useActionState(updatePostWithId, undefined);

    // Initialize content with post content if available
    const [content, setContent] = useState(post?.content || "");
    const editorRef = useRef<HTMLDivElement>(null);

    // Initial content load for div
    useEffect(() => {
        if (editorRef.current && post?.content) {
            editorRef.current.innerHTML = post.content;
        }
    }, [post?.content]);

    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    return (
        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                    <Input
                        name="title"
                        className="text-2xl md:text-3xl font-bold h-auto py-3 border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        placeholder="Post Title..."
                        required
                        defaultValue={post?.title || ""}
                    />
                </div>

                <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-muted/20 overflow-x-auto">
                        {[Bold, Italic, LinkIcon, Quote, List, Image].map((Icon, i) => (
                            <Button key={i} type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))}
                    </div>
                    {/* Visual Editor Area */}
                    <div
                        ref={editorRef}
                        className="flex-1 p-6 text-lg text-muted-foreground/80 outline-none"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleContentChange}
                    >
                        <p>{!post && "Start writing your amazing story here..."}</p>
                    </div>
                    <input type="hidden" name="content" value={content} />
                </div>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="font-semibold">Publishing</h3>

                    <div className="space-y-2">
                        <label className="text-xs font-medium">Category</label>
                        <select
                            name="categoryId"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            defaultValue={post?.categoryId || ""}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Visibility:</span>
                        <select
                            name="published"
                            className="bg-transparent font-medium text-foreground outline-none"
                            defaultValue={post?.published ? "true" : "false"}
                        >
                            <option value="false">Draft</option>
                            <option value="true">Public</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Featured:</span>
                        <select
                            name="featured"
                            className="bg-transparent font-medium text-foreground outline-none"
                            defaultValue={post?.featured ? "true" : "false"}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-2">
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="flex-1"
                        >
                            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : (post ? "Update Post" : "Save Post")}
                        </Button>
                    </div>

                    {state?.error && (
                        <p className="text-destructive text-xs">{state.error}</p>
                    )}
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="font-semibold">Featured Image</h3>
                    <Input
                        name="image"
                        placeholder="Image URL (Unsplash link, etc.)"
                        className="text-sm"
                        defaultValue={post?.image || ""}
                    />
                    <div className="border-2 border-dashed border-border rounded-lg h-32 flex items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer text-muted-foreground text-sm">
                        Click to upload
                    </div>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
                    <h3 className="font-semibold">SEO Settings</h3>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs font-medium">Meta Description / Excerpt</label>
                            <textarea
                                name="excerpt"
                                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Brief summary of the post..."
                                defaultValue={post?.excerpt || ""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
