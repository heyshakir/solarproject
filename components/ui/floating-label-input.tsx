"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";

interface FloatingLabelInputProps extends InputProps {
    label: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
    ({ className, label, id, ...props }, ref) => {
        return (
            <div className="relative">
                <Input
                    id={id}
                    className={cn(
                        "peer h-12 pt-5 pb-1 px-3 placeholder-transparent focus-visible:ring-1 focus-visible:ring-offset-0",
                        className
                    )}
                    placeholder={label}
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className="absolute left-3 top-2.5 text-xs text-muted-foreground transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground/80
                peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-primary pointer-events-none"
                >
                    {label}
                </label>
            </div>
        );
    }
);
FloatingLabelInput.displayName = "FloatingLabelInput";
