import React from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TechSprint 2K26 - 24 Hour Hackathon | Win an Internship",
  description:
    "Join TechSprint 2K26, a 24-hour national level hackathon. Compete in IdeateX and CodeJam phases for a chance to win an internship at a top tech company!",
  keywords: [
    "hackathon",
    "TechSprint 2026",
    "coding competition",
    "ideathon",
    "codathon",
    "internship",
    "RGMCET",
  ],
  openGraph: {
    title: "TechSprint 2K26 - 24 Hour Hackathon | Win an Internship",
    description:
      "Join TechSprint 2K26, a 24-hour national level hackathon. IdeateX → CodeJam → Win an Internship!",
    type: "website",
  },
  generator: 'TechSprint'
};

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
