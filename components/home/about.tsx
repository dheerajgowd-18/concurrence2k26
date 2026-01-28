"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ExternalLink, Calendar, Users } from "lucide-react";
import { collegeInfo, techSprintInfo, coordinators } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TechSprint</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {techSprintInfo.description}
          </p>
        </motion.div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Calendar, label: "Date", value: "Feb 27-28, 2026" },
            { icon: Users, label: "Team Size", value: "2-4 Members" },
            { icon: MapPin, label: "Mode", value: "Offline" },
            { icon: Globe, label: "Level", value: "National" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <item.icon className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
              <p className="text-white/40 text-xs mb-1">{item.label}</p>
              <p className="text-white font-medium text-sm">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] h-[300px]"
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
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Venue & Contact
            </h3>

            <div className="space-y-3">
              {/* College Name */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{collegeInfo.name}</p>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {collegeInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-xs">Phone</p>
                  <p className="text-white/40 text-xs">{collegeInfo.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-xs">Email</p>
                  <p className="text-white/40 text-xs">{collegeInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Website Button */}
            <a
              href={`https://${collegeInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 w-full py-3.5 mt-4 text-xs font-medium rounded-xl overflow-hidden transition-all duration-500"
            >
              <span className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors duration-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 group-hover:via-cyan-400/50 to-transparent transition-all duration-500" />
              <span className="relative text-white/60 group-hover:text-white transition-colors duration-300">
                Visit College Website
              </span>
              <ExternalLink className="relative w-3 h-3 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Coordinators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-white/60 mb-6">Program Coordinators</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {coordinators.programDirectors.map((coord) => (
              <div
                key={coord.name}
                className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center"
              >
                <p className="text-white text-sm font-medium">{coord.name}</p>
                <p className="text-white/40 text-xs">{coord.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
