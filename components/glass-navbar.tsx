"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
    { href: "#phases", label: "Phases" },
    { href: "#judges", label: "Judges" },
    { href: "#prizes", label: "Prizes" },
    { href: "#about", label: "About" },
];

export function GlassNavbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl"
        >
            <nav className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                        <Image
                            src="/college-logo.png"
                            alt="TechSprint Logo"
                            width={36}
                            height={36}
                            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                        />
                    </div>
                    <span
                        className="text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                    >
                        TECHSPRINT
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs text-white/50 hover:text-white transition-colors duration-200 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-4/5 transition-all duration-300" />
                        </Link>
                    ))}
                </div>
            </nav>
        </motion.header>
    );
}
