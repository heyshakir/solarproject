import { prisma } from "@/lib/prisma";
import { CategoryPageClient } from "./client";

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return <CategoryPageClient categories={categories} />;
}
