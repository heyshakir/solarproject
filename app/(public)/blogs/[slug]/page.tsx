import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/features/blog/BlogPost";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // Await params in newer Next.js versions, or access directly in older ones.
    // Assuming Next.js 14/15 based on "await params" pattern recommendation or just use params.slug directly if not promise.
    // Safe approach for recent versions:
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true }
    });

    if (!post) {
        notFound();
    }

    return <BlogPost post={post} />;
}
