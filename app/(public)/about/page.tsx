"use client";

import { motion } from "framer-motion";
import { Users, Award, Globe, Coffee, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const STATS = [
    { label: "Active Installers", value: "50K+", icon: Users },
    { label: "Articles Published", value: "1.2K", icon: Globe },
    { label: "Industry Experts", value: "100+", icon: Award },
    { label: "Watts Generated", value: "1.2GW", icon: Coffee },
];

const TEAM = [
    {
        name: "Alex Doe",
        role: "Founder & Editor in Chief",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
        bio: "Tech enthusiast with a passion for minimal design and clean code."
    },
    {
        name: "Sarah Smith",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        bio: "Obsessed with typography, colors, and user experience."
    },
    {
        name: "Michael Chen",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        bio: "Building distinct digital experiences with modern web technologies."
    },
    {
        name: "Emily Davis",
        role: "Content Strategist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
        bio: "Curating stories that matter and resonate with our audience."
    },
];

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            We are <span className="text-primary">SolarFlow</span>. <br />
                            Energizing the world, one story at a time.
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            SolarFlow is the premier digital publication for solar enthusiasts, installers, and green tech advocates.
                            We illuminate the latest breakthroughs in renewable energy.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg">Join the Movement <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            <Button variant="outline" size="lg">Our Vision</Button>
                        </div>
                    </motion.div>
                </div>

                {/* Background Decorative */}
                <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                    <div className="absolute bottom-20 right-40 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-secondary/20 border-y border-border/40">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border border-border/50"
                            >
                                <div className="p-3 bg-primary/10 text-primary rounded-full mb-4">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-3xl overflow-hidden bg-muted"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                alt="Office Culture"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                            <div className="space-y-4 text-lg text-muted-foreground">
                                <p>
                                    We started SolarFlow with a simple idea: to accelerate the adoption of renewable energy through education.
                                    In an era of climate change, we prioritize actionable insights and community action.
                                </p>
                                <p>
                                    Our team works remotely from sunny locations around the globe, testing the very tech we write about.
                                    We are committed to a carbon-neutral future and sustainable digital practices.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-secondary/10">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The creative minds behind the platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TEAM.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-background rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="aspect-square relative overflow-hidden bg-muted">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Social Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <Button variant="secondary" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
                                        <Button variant="secondary" size="icon" className="rounded-full"><Linkedin className="h-4 w-4" /></Button>
                                        <Button variant="secondary" size="icon" className="rounded-full"><Github className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-bold text-lg">{member.name}</h3>
                                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                    <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
