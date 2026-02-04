"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HomeSearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/blogs?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-10 w-full">
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for solar topics..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-20 h-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm focus-visible:ring-primary/50 shadow-sm transition-all hover:shadow-md"
                />
                <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 h-10 rounded-full px-4"
                    disabled={!query.trim()}
                >
                    Search
                </Button>
            </div>
        </form>
    );
}
