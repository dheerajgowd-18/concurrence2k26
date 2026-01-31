"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
                        <CheckCircle2 className="w-24 h-24 text-cyan-500 relative" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                    Submission Successful
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 mb-8 space-y-6"
                >
                    <div className="flex items-start gap-4 text-left">
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-white">Payment Under Verification</p>
                            <p className="text-sm text-white/40">Our team is manually verifying your payment screenshot. This usually takes 1-6 hours.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 text-left">
                        <Mail className="w-6 h-6 text-cyan-500 shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-white">Check Your Email</p>
                            <p className="text-sm text-white/40">Once approved, you will receive an official approval email with the WhatsApp group invitation link.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
