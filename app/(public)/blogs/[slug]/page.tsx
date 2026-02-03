"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, Twitter, Linkedin, Facebook, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReadingProgressBar } from "@/components/ui/reading-progress-bar";

export default function BlogDetailPage() {
    const params = useParams();
    // In a real app, fetch data based on params.slug
    const slug = params.slug;

    return (
        <div className="bg-background min-h-screen pb-20">
            <ReadingProgressBar />

            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
                    alt="Blog Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute top-8 left-4 md:left-8">
                    <Button variant="secondary" size="sm" asChild className="backdrop-blur-md bg-background/50 hover:bg-background/80">
                        <Link href="/blogs">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container max-w-4xl px-4 md:px-6 -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 md:p-10 shadow-xl"
                >
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Technology</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Feb 2, 2026</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        The Future of AI in Creative Design
                    </h1>

                    <div className="flex items-center justify-between border-b border-border/50 pb-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Author" fill />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Alex Doe</p>
                                <p className="text-xs text-muted-foreground">Senior Editor</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full"><Linkedin className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground">
                            Generative AI is not just a tool; it's a paradigm shift in how we approach creativity.
                            From user interfaces to graphic design, algorithms are becoming our co-pilots.
                        </p>

                        <h2>The Rise of Algorithmic Art</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary my-6 italic text-lg">
                            "AI won't replace designers. Designers who use AI will replace designers who don't."
                        </div>

                        <h3>Impact on UX/UI</h3>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto text-sm my-6">
                            <code>
                                {`// Example of AI integration
function generateDesign(system) {
  return system.optimize({
    contrast: "high",
    accessibility: true
  });
}`}
                            </code>
                        </pre>

                        <p>
                            Closing thoughts on the subject matter. The horizon is bright for those willing to adapt.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
