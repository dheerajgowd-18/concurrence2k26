"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code2, ArrowRight, Users, Clock, CheckCircle } from "lucide-react";
import { phases } from "@/lib/data";
import { cn } from "@/lib/utils";

const phaseStyles = {
    ideatex: {
        gradient: "from-yellow-500 to-orange-500",
        glow: "shadow-yellow-500/20",
        border: "border-yellow-500/30 hover:border-yellow-400/50",
        bg: "bg-yellow-500/5",
        text: "text-yellow-400",
        iconBg: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    },
    codejam: {
        gradient: "from-cyan-500 to-blue-500",
        glow: "shadow-cyan-500/20",
        border: "border-cyan-500/30 hover:border-cyan-400/50",
        bg: "bg-cyan-500/5",
        text: "text-cyan-400",
        iconBg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
    },
};

export function PhasesSection() {
    return (
        <section id="phases" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Two <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Phases</span>
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm sm:text-base">
                        Qualify in IdeateX to compete in CodeJam. Win CodeJam to earn an internship.
                    </p>
                </motion.div>

                {/* Phases Cards */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto relative">
                    {/* Connecting Arrow (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                        >
                            <ArrowRight className="w-6 h-6 text-white/60" />
                        </motion.div>
                    </div>

                    {phases.map((phase, index) => {
                        const style = phaseStyles[phase.id as keyof typeof phaseStyles];
                        const Icon = phase.icon === "lightbulb" ? Lightbulb : Code2;

                        return (
                            <motion.div
                                key={phase.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group"
                            >
                                <div className={cn(
                                    "relative overflow-hidden rounded-3xl border transition-all duration-500",
                                    style.border,
                                    style.bg,
                                    "hover:shadow-2xl",
                                    style.glow
                                )}>
                                    {/* Gradient overlay on hover */}
                                    <div className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                        `bg-gradient-to-br ${style.gradient}`,
                                        "opacity-[0.03]"
                                    )} />

                                    <div className="relative p-6 sm:p-8 space-y-6">
                                        {/* Icon & Title */}
                                        <div className="flex items-start gap-4">
                                            <motion.div
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                className={cn(
                                                    "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10",
                                                    style.iconBg
                                                )}
                                            >
                                                <Icon className={cn("w-8 h-8", style.text)} />
                                            </motion.div>
                                            <div>
                                                <h3 className={cn(
                                                    "text-2xl sm:text-3xl font-bold",
                                                    style.text
                                                )}>
                                                    {phase.name}
                                                </h3>
                                                <p className="text-white/50 text-sm mt-1">
                                                    {phase.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                                            {phase.description}
                                        </p>

                                        {/* Duration Badge */}
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <span className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium",
                                                style.border,
                                                style.bg,
                                                style.text
                                            )}>
                                                <Clock className="w-3 h-3" />
                                                {phase.duration}
                                            </span>
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs text-white/50">
                                                <Users className="w-3 h-3" />
                                                2-4 Members
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-2">
                                            {phase.details.map((detail, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                                                    <CheckCircle className={cn("w-4 h-4 flex-shrink-0", style.text)} />
                                                    {detail}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Outcome */}
                                        <div className={cn(
                                            "p-4 rounded-xl border",
                                            style.border,
                                            "bg-gradient-to-r",
                                            style.gradient,
                                            "bg-opacity-5"
                                        )}>
                                            <p className={cn("text-sm font-semibold", style.text)}>
                                                ✨ {phase.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile Arrow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex md:hidden justify-center py-4"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center rotate-90">
                        <ArrowRight className="w-5 h-5 text-white/40" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
