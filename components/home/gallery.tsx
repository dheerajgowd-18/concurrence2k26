"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";

const images = [
    "/previous-hackathon/IMG-1.jpg",
    "/previous-hackathon/IMG-2.jpg",
    "/previous-hackathon/IMG-3.jpg",
    "/previous-hackathon/IMG_2271.jpg",
    "/previous-hackathon/IMG_3166.jpg",
    "/previous-hackathon/IMG_3339.jpg",
    "/previous-hackathon/IMG_4038.JPG.jpeg",
    "/previous-hackathon/IMG_4052.JPG.jpeg",
];

export function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll functionality
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Calculate visible range for the carousel effect
    const getVisibleImages = () => {
        const visibleToCheck = [];
        for (let i = -1; i <= 1; i++) {
            // This simple logic works best for a centered-focused carousel
            visibleToCheck.push((currentIndex + i + images.length) % images.length);
        }
        return visibleToCheck;
    };


    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
                            PREVIOUS HACKATHON
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                    <p className="mt-4 text-white/60">Glimpses of innovation and chaos</p>
                </div>

                {/* Gallery Container */}
                <div
                    className="relative max-w-5xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Desktop/Tablet Carousel */}
                    <div className="hidden sm:flex items-center justify-center h-full relative perspective-1000">
                        <AnimatePresence mode="popLayout">
                            {images.map((src, index) => {
                                // Very basic carousel logic: Active, Previous, Next
                                // We only render indices close to current for performance/visuals if needed, 
                                // but standard mapping with conditional styles works well for small lists.

                                let position = 0; // 0 = center, -1 = left, 1 = right, others hidden
                                if (index === currentIndex) position = 0;
                                else if (index === (currentIndex - 1 + images.length) % images.length) position = -1;
                                else if (index === (currentIndex + 1) % images.length) position = 1;
                                else position = 100; // Hidden

                                if (position === 100) return null;

                                return (
                                    <motion.div
                                        key={`${src}-${index}`}
                                        initial={{ opacity: 0, scale: 0.8, x: position * 100 }}
                                        animate={{
                                            opacity: position === 0 ? 1 : 0.5,
                                            scale: position === 0 ? 1 : 0.8,
                                            x: position === 0 ? 0 : position === -1 ? -250 : 250,
                                            zIndex: position === 0 ? 20 : 10,
                                            rotateY: position === 0 ? 0 : position === -1 ? 15 : -15
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute w-[60%] h-[80%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={src}
                                                alt={`Hackathon Moment ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Overlay for non-active slides */}
                                            {position !== 0 && <div className="absolute inset-0 bg-black/50" />}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Mobile View: Simple Stack/Fade */}
                    <div className="sm:hidden relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={images[currentIndex]}
                                    alt={`Hackathon Moment ${currentIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/80 border border-white/10 flex items-center gap-2">
                                    <Camera className="w-3 h-3 text-cyan-400" />
                                    {currentIndex + 1} / {images.length}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                    ? "w-6 bg-gradient-to-r from-cyan-500 to-purple-500"
                                    : "bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
