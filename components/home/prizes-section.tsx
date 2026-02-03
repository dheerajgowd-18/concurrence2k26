"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Medal, Award, Zap } from "lucide-react";
import { prizes } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PrizesSection() {
    return (
        <section id="prizes" className="py-16 sm:py-24 relative overflow-hidden">
            {/* Background - Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                {/* Compact Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        <span className="text-xs uppercase tracking-widest text-amber-400/80 font-medium">Win Big</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        <span className="text-white">Grand </span>
                        <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Prizes</span>
                    </h2>
                </motion.div>

                {/* Prize Cards - Compact Horizontal Style */}
                <div className="max-w-4xl mx-auto space-y-3">
                    {prizes.map((prize, index) => {
                        const isWinner = prize.position === "winner";
                        const isRunnerUp = prize.position === "runner-up";

                        return (
                            <motion.div
                                key={prize.position}
                                initial={{ opacity: 0, x: isWinner ? 0 : (index === 0 ? -20 : 20) }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: isWinner ? 0 : 0.1 + index * 0.1 }}
                                className={cn(
                                    "group relative",
                                    isWinner && "order-first"
                                )}
                            >
                                <div className={cn(
                                    "relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300",
                                    isWinner
                                        ? "bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 border-amber-500/30 hover:border-amber-400/50"
                                        : isRunnerUp
                                            ? "bg-gradient-to-r from-slate-400/5 to-slate-300/5 border-slate-400/20 hover:border-slate-300/40"
                                            : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                                )}>
                                    {/* Rank Badge */}
                                    <div className={cn(
                                        "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold px-1 text-center leading-none",
                                        prize.position === "consolation" ? "text-lg" : "text-lg",
                                        isWinner
                                            ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-black"
                                            : isRunnerUp
                                                ? "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800"
                                                : "bg-gradient-to-br from-amber-700/80 to-amber-800 text-amber-200"
                                    )}>
                                        {isWinner ? "1st" : isRunnerUp ? "2nd" : prize.position === "consolation" ? "4th" : "3rd"}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                            <h3 className={cn(
                                                "font-bold text-sm sm:text-base",
                                                isWinner ? "text-amber-300" : "text-white"
                                            )}>
                                                {prize.title}
                                            </h3>
                                            {isWinner && (
                                                <span className="self-start px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[9px] sm:text-[10px] font-semibold uppercase">
                                                    Grand Prize
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed">
                                            {prize.description}
                                        </p>
                                    </div>

                                    {/* Internship Badge */}
                                    <div className={cn(
                                        "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                                        isWinner
                                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                    )}>
                                        <Briefcase className="w-3 h-3" />
                                        Internship
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-8 space-y-1"
                >
                    <p className="text-white/40 text-xs">
                        Top 3 teams receive internship opportunities + cash prizes
                    </p>
                    <p className="text-cyan-400/60 text-[11px]">
                        🎓 All participants receive a certificate of participation
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
