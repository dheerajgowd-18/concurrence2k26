"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Medal, Sparkles } from "lucide-react";
import { prizes } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap = {
    briefcase: Briefcase,
    trophy: Trophy,
    medal: Medal,
};

export function PrizesSection() {
    return (
        <section id="prizes" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Golden glow for prizes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6"
                    >
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Grand <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Prizes</span>
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm sm:text-base">
                        Win an internship and kickstart your tech career
                    </p>
                </motion.div>

                {/* Prizes Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {prizes.map((prize, index) => {
                        const Icon = iconMap[prize.icon as keyof typeof iconMap] || Trophy;
                        const isHighlight = prize.highlight;

                        return (
                            <motion.div
                                key={prize.position}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={cn(
                                    "relative group",
                                    isHighlight && "md:-mt-8 md:mb-8"
                                )}
                            >
                                <div className={cn(
                                    "relative overflow-hidden rounded-3xl border transition-all duration-500",
                                    isHighlight
                                        ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-yellow-500/30 hover:border-yellow-400/50 shadow-2xl shadow-yellow-500/10"
                                        : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                                )}>
                                    {/* Highlight glow effect */}
                                    {isHighlight && (
                                        <>
                                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-[80px]" />
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500" />
                                        </>
                                    )}

                                    <div className={cn(
                                        "relative p-6 sm:p-8 text-center space-y-4",
                                        isHighlight && "py-10"
                                    )}>
                                        {/* Position Badge */}
                                        <div className={cn(
                                            "inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                            isHighlight
                                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                                                : "bg-white/10 text-white/60"
                                        )}>
                                            {prize.position === "winner" ? "🏆 Winner" : prize.position === "runner-up" ? "Runner-up" : "Third Place"}
                                        </div>

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            className={cn(
                                                "mx-auto w-20 h-20 rounded-2xl flex items-center justify-center border",
                                                isHighlight
                                                    ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                                                    : "bg-white/[0.05] border-white/10"
                                            )}
                                        >
                                            <Icon className={cn(
                                                "w-10 h-10",
                                                isHighlight ? "text-yellow-400" : "text-white/60"
                                            )} />
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className={cn(
                                            "text-2xl sm:text-3xl font-bold",
                                            isHighlight
                                                ? "bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                                                : "text-white"
                                        )}>
                                            {prize.title}
                                        </h3>

                                        {/* Description */}
                                        <p className={cn(
                                            "text-sm leading-relaxed",
                                            isHighlight ? "text-white/70" : "text-white/50"
                                        )}>
                                            {prize.description}
                                        </p>

                                        {/* CTA for winner */}
                                        {isHighlight && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.5 }}
                                                className="pt-4"
                                            >
                                                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold">
                                                    <Briefcase className="w-4 h-4" />
                                                    Career Opportunity
                                                </span>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
