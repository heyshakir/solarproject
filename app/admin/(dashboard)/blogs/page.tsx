import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogTable } from "@/components/features/admin/BlogTable";
import { prisma } from "@/lib/prisma";

export default async function AdminBlogsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true }
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
                    <p className="text-muted-foreground">Manage your blog content.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blogs/new">
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Link>
                </Button>
            </div>

            <BlogTable posts={posts} />
        </div>
    );
}
