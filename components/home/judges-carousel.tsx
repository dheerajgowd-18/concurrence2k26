"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Quote } from "lucide-react";
import { judges } from "@/lib/data";

export function JudgesCarousel() {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleInteraction = () => {
        setIsPaused(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 3000); // Resume after 3s of no interaction
    };

    return (
        <section id="judges" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px] -z-10" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Meet The <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Judges</span>
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm sm:text-base">
                        Industry experts who will evaluate your innovations and code
                    </p>
                </motion.div>

                {/* Carousel Container - manual scroll + pause on interaction */}
                <div
                    ref={containerRef}
                    className="relative overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleInteraction}
                    onScroll={handleInteraction}
                >
                    {/* Scrolling Track - pauses on interaction */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 sm:gap-6 py-4 animate-scroll whitespace-nowrap"
                        style={{
                            animationPlayState: isPaused ? 'paused' : 'running',
                            width: 'max-content'
                        }}
                    >
                        {/* Repeat judges many times for a loop effect */}
                        {[...judges, ...judges, ...judges, ...judges, ...judges, ...judges].map((judge, index) => (
                            <div key={`${judge.id}-${index}`} className="snap-center">
                                <JudgeCard judge={judge} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function JudgeCard({ judge }: { judge: typeof judges[0] }) {
    return (
        <div className="flex-shrink-0 w-[300px] sm:w-[380px]">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 h-[320px] sm:h-[340px] flex flex-col">
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Photo & Info */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur group-hover:opacity-75 transition-opacity" />
                            <Image
                                src={judge.image}
                                alt={judge.name}
                                width={80}
                                height={80}
                                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-background"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                                {judge.name}
                            </h3>
                            <p className="text-purple-400 text-xs sm:text-sm font-medium line-clamp-1">
                                {judge.title}
                            </p>
                            <p className="text-white/40 text-xs truncate">
                                {judge.company}
                            </p>
                        </div>
                    </div>

                    {/* Quote - fixed height */}
                    <div className="relative pl-3 border-l-2 border-purple-500/30 mb-4 flex-shrink-0">
                        <Quote className="absolute -left-2 -top-1 w-3 h-3 text-purple-500/50" />
                        <p className="text-white/60 text-xs sm:text-sm italic leading-relaxed line-clamp-2">
                            "{judge.quote}"
                        </p>
                    </div>

                    {/* Expertise Tags - flex grow to push LinkedIn to bottom */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1">
                        {judge.expertise.slice(0, 3).map((skill) => (
                            <span
                                key={skill}
                                className="px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium text-purple-400/80 bg-purple-500/10 border border-purple-500/20 rounded-full h-fit"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* LinkedIn - always at bottom */}
                    {judge.linkedin && (
                        <a
                            href={judge.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-white/40 hover:text-purple-400 transition-colors mt-auto pt-3"
                        >
                            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                            Connect on LinkedIn
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
