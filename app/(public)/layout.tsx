import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                select: { posts: true }
            }
        },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar categories={categories} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
