import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogEditor } from "@/components/features/admin/BlogEditor";
import { prisma } from "@/lib/prisma";

interface EditBlogPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const { id } = await params;

    const [post, categories] = await Promise.all([
        prisma.post.findUnique({
            where: { id },
            include: { category: true }
        }),
        prisma.category.findMany()
    ]);

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/blogs"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
                    <p className="text-muted-foreground text-sm">Make changes to your content.</p>
                </div>
            </div>

            <BlogEditor categories={categories} post={post} />
        </div>
    );
}
