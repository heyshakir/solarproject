import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogEditor } from "@/components/features/admin/BlogEditor";
import { prisma } from "@/lib/prisma";

export default async function NewBlogPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/blogs"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
                    <p className="text-muted-foreground text-sm">Drafting a new entry.</p>
                </div>
            </div>

            <BlogEditor categories={categories} />
        </div>
    );
}
