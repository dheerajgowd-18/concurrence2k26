"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { techSprintInfo, collegeInfo } from "@/lib/data";
import { CountdownTimer } from "./countdown-timer";
import FloatingLines from "@/components/FloatingLines";
import { Button } from "@/components/ui/moving-border";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* FloatingLines Background */}
      <div className="absolute inset-0 -z-10">
        <FloatingLines
          linesGradient={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[4, 6, 4]}
          lineDistance={[8, 6, 10]}
          animationSpeed={0.8}
          interactive={true}
          bendRadius={6}
          bendStrength={-0.4}
          parallax={true}
          parallaxStrength={0.15}
          mixBlendMode="screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      <div className="container mx-auto px-4 text-center pt-24 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* College Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">
              {collegeInfo.department} presents
            </p>
          </motion.div>

          {/* 24 Hours Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
          >
            <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-sm font-bold text-orange-400">24 HOURS</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <span
              className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                TECHSPRINT
              </span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto px-4 font-medium"
          >
            {techSprintInfo.tagline}
          </motion.p>

          {/* Phase Flow Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4"
          >
            <span className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
              💡 IdeateX
            </span>
            <ArrowRight className="w-4 h-4 text-white/30 hidden sm:block" />
            <span className="text-white/30 sm:hidden">→</span>
            <span className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 rounded-full">
              {"</>"} CodeJam
            </span>
            <ArrowRight className="w-4 h-4 text-white/30 hidden sm:block" />
            <span className="text-white/30 sm:hidden">→</span>
            <span className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded-full">
              🎯 Internship
            </span>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <CountdownTimer targetDate="2026-02-27T09:00:00" />
          </motion.div>

          {/* Event Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs sm:text-sm font-medium text-white/60 border border-white/10 rounded-full bg-white/[0.02]">
              {techSprintInfo.dates.start} — {techSprintInfo.dates.end}
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4 flex justify-center"
          >
            <Link href="#phases">
              <Button
                borderRadius="2rem"
                containerClassName="h-14 w-auto px-0"
                className="bg-background/80 border-white/10 px-8 gap-2 text-base font-semibold"
                borderClassName="bg-[radial-gradient(#22d3ee_40%,transparent_60%)]"
                duration={3000}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* College Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-white/30 pt-4"
          >
            {collegeInfo.name}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-cyan-400/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
