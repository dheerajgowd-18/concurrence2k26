"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Calendar, Users, Zap, Target } from "lucide-react";
import { collegeInfo, techSprintInfo, coordinators } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-400/80 font-medium">The Event</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TechSprint</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {techSprintInfo.description}
          </p>
        </motion.div>

        {/* Bento Grid Layout - Unique Design */}
        <div className="max-w-4xl mx-auto">
          {/* Top Row - Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4"
          >
            {[
              { icon: Calendar, value: "Feb 27-28", color: "cyan" },
              { icon: Users, value: "3-5 Members", color: "purple" },
              { icon: Zap, value: "24 Hours", color: "yellow" },
              { icon: MapPin, value: "Offline", color: "pink" },
            ].map((stat, i) => (
              <div
                key={stat.value}
                className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs`}
              >
                <stat.icon className={`w-3.5 h-3.5 ${stat.color === "cyan" ? "text-cyan-400" :
                  stat.color === "purple" ? "text-purple-400" :
                    stat.color === "yellow" ? "text-yellow-400" : "text-pink-400"
                  }`} />
                <span className="text-white/70 font-medium">{stat.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Map - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-3 rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] h-[220px] sm:h-[260px] relative group"
            >
              <iframe
                src={collegeInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="College Location Map"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-white/80 font-medium">
                📍 {collegeInfo.shortName}
              </div>
            </motion.div>

            {/* Contact Card - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 flex flex-col justify-between h-[220px] sm:h-[260px]"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest bg-white/5 py-1 px-3 rounded-md w-fit">Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${collegeInfo.phone}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-cyan-400 transition-colors group">
                    <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    {collegeInfo.phone}
                  </a>
                  <a href={`mailto:${collegeInfo.email}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-cyan-400 transition-colors group">
                    <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    {collegeInfo.email}
                  </a>
                </div>
              </div>

              <a
                href={`https://${collegeInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 hover:text-white hover:border-cyan-500 hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/5 group"
              >
                Visit Website
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Coordinators Section - High Visibility Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Patrons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-4">Patrons</h4>
              <div className="grid grid-cols-2 gap-3">
                {coordinators.patrons.map((patron) => (
                  <div key={patron.name} className="flex flex-col">
                    <span className="text-xs text-white font-bold">{patron.name}</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-tighter">{patron.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coordinators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold mb-4">Coordinators</h4>
              <div className="flex flex-col gap-4">
                {/* HOD - Middle */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs text-white font-bold">{coordinators.programDirectors[0].name}</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-tighter">{coordinators.programDirectors[0].title}</span>
                </div>

                {/* Conveners - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-white font-bold">{coordinators.programDirectors[1].name}</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-tighter">{coordinators.programDirectors[1].title}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-white font-bold">{coordinators.programDirectors[2].name}</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-tighter">{coordinators.programDirectors[2].title}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
