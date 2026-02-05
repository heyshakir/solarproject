"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface MissionModalProps {
    children?: ReactNode;
}

export function MissionModal({ children }: MissionModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || <Button variant="outline" size="lg">Our Mission</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">Our Mission</DialogTitle>
                    <DialogDescription>
                        Advancing the future of solar energy.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            At <span className="font-semibold text-foreground">SolarFlow</span>, our mission is to advance the future of solar energy through focused research, practical innovation, and expert guidance. We work on impactful solar research projects that bridge the gap between theory and real-world application, helping ideas move from labs to the field.
                        </p>
                        <p>
                            We guide students, professionals, and organizations in the solar domain by providing technical direction, insights, and hands-on support, enabling smarter system design, better efficiency, and sustainable energy solutions.
                        </p>
                        <p>
                            Our goal is to make solar energy more accessible, reliable, and future-ready through knowledge, research, and collaboration.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium">Committed to a sustainable future</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
