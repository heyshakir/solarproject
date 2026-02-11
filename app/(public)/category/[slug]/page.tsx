import { Suspense } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/features/blog/BlogCard";

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categoryName = decodeURIComponent(slug);

    return {
        title: `${categoryName} | SolarFlow`,
        description: `Explore our latest articles in ${categoryName}.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categoryName = decodeURIComponent(slug);

    // Fetch category and its posts
    const category = await prisma.category.findUnique({
        where: { name: categoryName },
        include: {
            posts: {
                where: { published: true },
                include: {
                    category: { select: { name: true } }
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="bg-secondary/10 min-h-full">
            <div className="container px-4 md:px-6 py-24">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                        <Link href="/blogs">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all blogs
                        </Link>
                    </Button>

                    <div className="mb-12 max-w-3xl">
                        <span className="text-sm font-medium text-primary uppercase tracking-wider mb-2 block">Category</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{category.name}</h1>
                        {category.description && (
                            <p className="text-muted-foreground text-lg border-l-4 border-primary/20 pl-4 py-1">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    {category.posts.length > 0 ? (
                        category.posts.map((post, index) => (
                            <BlogCard
                                key={post.id}
                                post={{
                                    ...post,
                                    category: post.category?.name || "Uncategorized",
                                    excerpt: post.excerpt || "",
                                    readTime: "5 min read",
                                    date: new Date(post.createdAt).toLocaleDateString(),
                                    image: post.image || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000",
                                }}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <p>No articles found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
