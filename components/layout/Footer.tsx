import Link from "next/link";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="container max-w-7xl flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Code2 className="h-6 w-6" />
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by <span className="font-semibold text-foreground">Lumina Team</span>.
                        The source code is available on <span className="underline underline-offset-4">GitHub</span>.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Linkedin className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
