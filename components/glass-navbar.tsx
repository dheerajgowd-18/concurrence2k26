"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#phases", label: "Phases" },
    { href: "/#judges", label: "Judges" },
    { href: "/#prizes", label: "Prizes" },
    { href: "/admin/login", label: "Admin" },
];

export function GlassNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
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

                    {/* Desktop Nav Links */}
                    <div className="hidden sm:flex items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors duration-200 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-4/5 transition-all duration-300" />
                            </Link>
                        ))}

                        {/* Register Button */}
                        <Link
                            href="/register"
                            className="ml-3 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile: Register + Menu */}
                    <div className="flex sm:hidden items-center gap-2">
                        <Link
                            href="/register"
                            className="px-3 py-1.5 text-[10px] font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        >
                            Register
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full bg-white/5 border border-white/10"
                        >
                            {isOpen ? (
                                <X className="w-4 h-4 text-white/60" />
                            ) : (
                                <Menu className="w-4 h-4 text-white/60" />
                            )}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-4 right-4 z-40 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 sm:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
