"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { Linkedin, Quote } from "lucide-react";
import { judges } from "@/lib/data";

export function JudgesCarousel() {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Meet The <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Judges</span>
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm sm:text-base">
                        Industry experts who will evaluate your innovations and code
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Track */}
                    <motion.div
                        animate={{
                            x: isPaused ? 0 : [0, -100 * judges.length],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                        className="flex gap-6 py-4"
                    >
                        {/* Duplicate judges for infinite scroll effect */}
                        {[...judges, ...judges, ...judges].map((judge, index) => (
                            <JudgeCard key={`${judge.id}-${index}`} judge={judge} index={index} />
                        ))}
                    </motion.div>
                </div>

                {/* Manual Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {judges.map((_, index) => (
                        <div
                            key={index}
                            className="w-2 h-2 rounded-full bg-white/20 hover:bg-purple-400/50 transition-colors cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function JudgeCard({ judge, index }: { judge: typeof judges[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 3) * 0.1 }}
            className="flex-shrink-0 w-[320px] sm:w-[380px]"
        >
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 sm:p-8 space-y-6">
                    {/* Photo & Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur group-hover:opacity-75 transition-opacity" />
                            <Image
                                src={judge.image}
                                alt={judge.name}
                                width={80}
                                height={80}
                                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-background"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                {judge.name}
                            </h3>
                            <p className="text-purple-400 text-sm font-medium">
                                {judge.title}
                            </p>
                            <p className="text-white/40 text-xs">
                                {judge.company}
                            </p>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="relative pl-4 border-l-2 border-purple-500/30">
                        <Quote className="absolute -left-2 -top-1 w-4 h-4 text-purple-500/50" />
                        <p className="text-white/60 text-sm italic leading-relaxed">
                            "{judge.quote}"
                        </p>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                        {judge.expertise.map((skill) => (
                            <span
                                key={skill}
                                className="px-2.5 py-1 text-[10px] font-medium text-purple-400/80 bg-purple-500/10 border border-purple-500/20 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* LinkedIn */}
                    {judge.linkedin && (
                        <a
                            href={judge.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-purple-400 transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                            Connect on LinkedIn
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
