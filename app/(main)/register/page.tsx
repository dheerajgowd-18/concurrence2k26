"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Users, Clock, Trophy, Calendar, Award, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/moving-border";

// TODO: Replace this with your actual Google Form URL
const GOOGLE_FORM_URL = "https://forms.google.com/your-form-url";

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[150px] -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>
        </motion.div>

        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-medium">Registrations Open</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Join{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              TechSprint 2K26
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white/60">
              <Calendar className="w-3 h-3 text-cyan-400" />
              Feb 27-28, 2026
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium">
              National Level
            </span>
          </div>
        </motion.div>

        {/* Main Card - 2 Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] overflow-hidden">
            {/* Glowing top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {/* Left - Benefits (2 cols) */}
              <div className="md:col-span-2 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-white/80 mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Trophy, text: "Cash Prizes up to ₹30,000", color: "text-yellow-400" },
                    { icon: Award, text: "Internship Opportunities", color: "text-purple-400" },
                    { icon: Users, text: "Industry Networking", color: "text-cyan-400" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className={`w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center`}>
                        <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                      <span className="text-white/70 text-sm">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] text-cyan-400/60">
                  🎓 All participants receive a certificate
                </p>
              </div>

              {/* Right - CTA (3 cols) */}
              <div className="md:col-span-3 p-5 sm:p-6 flex flex-col justify-center">
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { icon: Users, label: "3-5 Members" },
                    { icon: Clock, label: "24 Hours" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/60"
                    >
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                  ))}
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Ready to Compete?
                </h2>
                <p className="text-white/40 text-xs mb-5">
                  Form your team and register through Google Forms
                </p>

                {/* CTA Button with Rotating Border */}
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    borderRadius="0.75rem"
                    containerClassName="h-12 w-full"
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-sm font-semibold gap-2"
                    borderClassName="bg-[radial-gradient(#22d3ee_40%,transparent_60%)]"
                    duration={3000}
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>

                <p className="mt-3 text-[10px] text-white/30 text-center">
                  Opens in Google Forms
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
