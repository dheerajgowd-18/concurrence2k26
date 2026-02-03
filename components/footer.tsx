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
  // Removed unused state and interaction handler

  return (
    <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-foreground/5 flex items-center justify-center">
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
                  HACKATHON
                </span>
                <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">2K26</span>
              </div>
            </Link>
            <p className="text-foreground/40 text-xs sm:text-sm leading-relaxed">
              {techSprintInfo.tagline}
            </p>
            <p className="text-foreground/30 text-xs font-medium">
              {techSprintInfo.dates.start} - {techSprintInfo.dates.end}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/40 text-xs hover:text-cyan-400 transition-colors"
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
              <li className="flex items-start gap-2 text-foreground/40 text-xs">
                <MapPin className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" />
                <span>{collegeInfo.shortName}, Nandyal</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/40 text-xs">
                <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>{collegeInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/40 text-xs">
                <Mail className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>{collegeInfo.email}</span>
              </li>
            </ul>

            <h3 className="font-semibold text-white text-sm mt-6 mb-4">Student Coordinators</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-foreground/40 text-xs">
                <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>Syed Aman: 9966466951</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/40 text-xs">
                <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>B.MD.Rafi: 7995399545</span>
              </li>
              <li className="flex items-center gap-2 text-foreground/40 text-xs">
                <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>Y. Javya: 6302053116</span>
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
                    className="w-9 h-9 rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-foreground/40 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-foreground/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 font-medium">
          <p className="text-foreground/20 text-[10px]">
            © 2026 Hackathon. {collegeInfo.department}
          </p>
          <p className="text-foreground/15 text-[10px]">
            {collegeInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
