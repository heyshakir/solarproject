import { prisma } from "@/lib/prisma";
import { CategoriesView } from "@/components/features/categories/CategoriesView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore Topics | SolarFlow",
    description: "Browse our curated collection of articles across Technology, Design, Business, and more.",
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                take: 3
            },
            _count: {
                select: { posts: true }
            }
        },
        orderBy: { name: 'asc' }
    });

    return <CategoriesView categories={categories} />;
}
