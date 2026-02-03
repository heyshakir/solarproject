"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Users, TrendingUp } from "lucide-react";

// Mock Stats
const STATS = [
    { name: "Total Blogs", value: "24", change: "+4", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Total Views", value: "45.2K", change: "+12%", icon: Eye, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Subscribers", value: "1,204", change: "+85", icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Avg. Read Time", value: "4m 12s", change: "-2%", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your blog's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                            <p className="text-sm text-muted-foreground">{stat.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border/50 rounded-xl p-6 h-[400px] flex items-center justify-center text-muted-foreground"
                >
                    Chart Placeholder (No backend logic)
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border/50 rounded-xl p-6"
                >
                    <h3 className="font-semibold mb-4">Recent Drafts</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                                <div className="h-10 w-10 rounded bg-muted animate-pulse" /> // Placeholder img
                                <div>
                                    <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
                                    <div className="h-3 w-20 bg-muted/50 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
