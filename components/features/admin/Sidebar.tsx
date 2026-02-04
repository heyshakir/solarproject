"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Settings, LogOut, ChevronLeft, ChevronRight, PlusCircle, Code2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "All Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "New Blog", href: "/admin/blogs/new", icon: PlusCircle },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ width: 240 }}
            animate={{ width: isCollapsed ? 80 : 240 }}
            className={cn(
                "relative h-screen border-r border-border bg-card z-20 hidden md:flex flex-col",
                className
            )}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-background border border-border rounded-full p-1 shadow-sm hover:bg-accent transition-colors z-30"
            >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Header */}
            <div className={cn("flex items-center h-16 px-6 border-b border-border/50", isCollapsed ? "justify-center px-0" : "")}>
                <Code2 className="h-6 w-6 text-primary flex-shrink-0" />
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-2 font-bold text-lg tracking-tight whitespace-nowrap"
                    >
                        SolarFlow Admin
                    </motion.span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center rounded-lg px-3 py-2.5 transition-colors group relative",
                                isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground hover:text-foreground",
                                isCollapsed ? "justify-center" : ""
                            )}>
                                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary-foreground" : "")} />

                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="ml-3 text-sm font-medium whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {item.name}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border/50 space-y-2">
                <div className={cn("flex items-center", isCollapsed ? "justify-center flex-col gap-4" : "justify-between")}>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size={isCollapsed ? "icon" : "sm"}
                        className={cn(isCollapsed ? "" : "w-full justify-start ml-2")}
                        onClick={() => import("next-auth/react").then(({ signOut }) => signOut())}
                    >
                        <LogOut className="h-4 w-4" />
                        {!isCollapsed && <span className="ml-2">Logout</span>}
                    </Button>
                </div>
            </div>
        </motion.aside>
    );
}
