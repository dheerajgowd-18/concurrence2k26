"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
}

export function GlowButton({
    children,
    className,
    href,
    onClick,
    variant = "primary"
}: GlowButtonProps) {
    const baseStyles = "relative group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full overflow-hidden transition-all duration-500";

    const variants = {
        primary: "text-white border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
        secondary: "text-white/80 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 hover:text-white",
        ghost: "text-white/60 hover:text-white hover:bg-white/[0.03]"
    };

    const content = (
        <>
            {/* Animated glow effect */}
            {variant === "primary" && (
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20" />
                    <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                </span>
            )}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(baseStyles, variants[variant], className)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className={cn(baseStyles, variants[variant], className)}
        >
            {content}
        </button>
    );
}
