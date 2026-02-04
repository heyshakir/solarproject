import { BlogList } from "@/components/features/blog/BlogList";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
    title: "Blogs | SolarFlow",
    description: "Explore our latest articles.",
};

export default function BlogsPage() {
    return (
        <div className="bg-secondary/10 min-h-full">
            <div className="container px-4 md:px-6 py-24">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Writing</h1>
                    <p className="text-muted-foreground text-lg">
                        Insights, tutorials, and views on what matters in tech.
                    </p>
                </div>
                <Suspense fallback={
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                }>
                    <BlogList />
                </Suspense>
            </div>
        </div>
    );
}
