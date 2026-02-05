"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeSearchBar } from "@/components/features/home/HomeSearchBar";


interface HeroProps {
    latestPostSlug?: string;
}

export default function Hero({ latestPostSlug }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-16">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1, opacity: 0.4 }}
                    className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-blue-400/20 blur-[100px]"
                />
                <motion.div
                    style={{ y: y2, opacity: 0.3 }}
                    className="absolute bottom-[0%] right-[-5%] w-[60vh] h-[60vh] rounded-full bg-indigo-500/20 blur-[120px]"
                />
            </div>

            <div className="container relative z-10 flex flex-col items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
                >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Discover SolarFlow Premium</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6"
                >
                    Science Behind <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Clean Energy
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
                >
                    Exploring the science, technology, and analytics behind solar <br />
                    energy to accelerate innovation and sustainable solutions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                    className="w-full px-4"
                >
                    <HomeSearchBar />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href={latestPostSlug ? `/blogs/${latestPostSlug}` : "/blogs"}>
                        <Button size="lg" className="text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                            Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/categories">
                        <Button size="lg" variant="outline" className="text-base h-12 px-8 rounded-full bg-background/50 backdrop-blur-sm">
                            Explore Topics
                        </Button>
                    </Link>
                </motion.div>
            </div>


        </section>
    );
}
