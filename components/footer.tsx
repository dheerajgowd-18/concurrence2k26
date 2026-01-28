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

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2026 TechSprint. {collegeInfo.department}
          </p>
          <p className="text-white/20 text-xs">
            {collegeInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
