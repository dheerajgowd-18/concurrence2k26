"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { collegeInfo, techSprintInfo, socialLinks } from "@/lib/data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "#phases", label: "Phases" },
  { href: "#judges", label: "Judges" },
  { href: "#prizes", label: "Prizes" },
  { href: "#about", label: "About" },
];

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Footer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                <Image
                  src="/college-logo.png"
                  alt="TechSprint Logo"
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <span
                  className="block text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  TECHSPRINT
                </span>
                <span className="text-[10px] text-white/30">2K26</span>
              </div>
            </Link>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
              {techSprintInfo.tagline}
            </p>
            <p className="text-white/30 text-xs">
              {techSprintInfo.dates.start} - {techSprintInfo.dates.end}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-xs hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-white/40 text-xs">{collegeInfo.shortName}, Nandyal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-white/40 text-xs">{collegeInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="text-white/40 text-xs">{collegeInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Developer Credits */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          {/* Title */}
          <p className="text-center text-[10px] text-white/40 uppercase tracking-widest mb-4">
            Developed by
          </p>

          {/* Scrollable Container - pause on hover/touch */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Scrollable track with auto-scroll - pauses on interaction */}
            <div
              ref={scrollRef}
              className="flex gap-4 py-3 animate-scroll-slow"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Duplicate devs for infinite scroll effect */}
              {[...Array(3)].flatMap((_, repeatIndex) => [
                { name: "Dheeraj Gowd", email: "dheerajgowd@example.com", linkedin: "https://linkedin.com/in/dheerajgowd", github: "https://github.com/dheerajgowd-18" },
                { name: "Akshith", email: "akshith@example.com", linkedin: "https://linkedin.com/in/akshith", github: "https://github.com/akshith" },
                { name: "Aasrith", email: "aasrith@example.com", linkedin: "https://linkedin.com/in/aasrith", github: "https://github.com/aasrith" },
              ].map((dev) => ({ ...dev, key: `${repeatIndex}-${dev.name}` }))).map((dev) => (
                <div
                  key={dev.key}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 shrink-0"
                >
                  {/* Name */}
                  <span className="text-white text-sm font-semibold whitespace-nowrap">{dev.name}</span>

                  {/* Social Links */}
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${dev.email}`} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all" title="Email">
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-blue-400/10 transition-all" title="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" title="GitHub">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/20 text-[10px]">
              © 2026 TechSprint. {collegeInfo.department}
            </p>
            <p className="text-white/15 text-[10px]">
              {collegeInfo.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
