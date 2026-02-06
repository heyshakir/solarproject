"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavSearchBarProps {
    className?: string;
    onSearch?: () => void;
}

export function NavSearchBar({ className, onSearch }: NavSearchBarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/blogs?search=${encodeURIComponent(query)}`);
            if (onSearch) {
                onSearch();
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className={cn("relative", className)}>
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 pr-12 h-9 w-[200px] lg:w-[300px] rounded-full bg-background/50 focus:bg-background transition-all"
                />
            </div>
        </form>
    );
}
