"use client";

import { Sidebar } from "@/components/features/admin/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function AdminMobileHeader() {
    return (
        <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6 md:hidden justify-between">
            <span className="font-bold">SolarFlow Admin</span>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <Sidebar className="flex w-full border-none" />
                </SheetContent>
            </Sheet>
        </header>
    );
}
