"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity } from "lucide-react";

const STATIC_DATA = [
    { date: "Mon", articles: 42, viewTime: 3.5 },
    { date: "Tue", articles: 43, viewTime: 4.2 },
    { date: "Wed", articles: 45, viewTime: 3.8 },
    { date: "Thu", articles: 45, viewTime: 4.5 },
    { date: "Fri", articles: 48, viewTime: 5.2 },
    { date: "Sat", articles: 48, viewTime: 4.8 },
    { date: "Sun", articles: 50, viewTime: 5.5 },
];

export function DashboardChart() {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Performance Overview
                </h3>
                <p className="text-sm text-muted-foreground">Weekly Article Growth & Engagement</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={STATIC_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="hsl(var(--primary))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Articles', angle: -90, position: 'insideLeft', fill: 'hsl(var(--primary))' }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#82ca9d"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Avg Time (m)', angle: 90, position: 'insideRight', fill: '#82ca9d' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                                color: "hsl(var(--foreground))",
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="stepAfter"
                            dataKey="articles"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(var(--background))", strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name="Articles"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="viewTime"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(var(--background))", strokeWidth: 2 }}
                            name="Avg View Time"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
