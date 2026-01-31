"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    School,
    Hash,
    CreditCard,
    Upload,
    ArrowRight,
    CheckCircle2,
    Loader2,
    AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getNextAvailableQR, createUser } from "@/lib/supabase-actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        reg_no: "",
        email: "",
        phone: "",
        college: "RGM",
        otherCollege: "", // Added for custom college
        transaction_id: "",
        screenshot: null as File | null,
    });

    const [assignedQR, setAssignedQR] = useState<any>(null);

    // Load QR on Step 2
    useEffect(() => {
        if (step === 2 && !assignedQR) {
            fetchQR();
        }
    }, [step]);

    const fetchQR = async () => {
        try {
            setLoading(true);
            const qr = await getNextAvailableQR();
            if (!qr) {
                setError("No active payment slots available. Please try again later.");
            } else {
                setAssignedQR(qr);
            }
        } catch (err) {
            setError("Failed to fetch payment details.");
        } finally {
            setLoading(false);
        }
    };

    const validateStep1 = () => {
        if (!formData.name.trim()) return "Enter full name.";
        if (formData.reg_no.length < 3) return "Registration number is too short."; // Loosened
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email address.";
        if (formData.phone.length < 10) return "Phone number must be at least 10 digits."; // Loosened
        if (formData.college === 'OTHERS' && !formData.otherCollege.trim()) return "Enter your college name."; // Validation for 'Other'
        return null;
    };

    const handleNext = () => {
        if (step === 1) {
            const vError = validateStep1();
            if (vError) {
                setError(vError);
                return;
            }
        }
        setError(null);
        setStep((s) => (s + 1) as Step);
    };

    const handleSubmit = async () => {
        if (!formData.transaction_id || !formData.screenshot) {
            setError("Please provide transaction ID and screenshot.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // 1. Upload Screenshot
            const fileExt = formData.screenshot.name.split('.').pop();
            const fileName = `${formData.reg_no}_${Math.random()}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("screenshots")
                .upload(fileName, formData.screenshot);

            if (uploadError) throw uploadError;

            const screenshot_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/screenshots/${uploadData.path}`;

            // Final College Name
            const finalCollege = formData.college === "RGM" ? "RGM College" : formData.otherCollege;

            // 2. Create User
            await createUser({
                name: formData.name,
                reg_no: formData.reg_no,
                email: formData.email,
                phone: formData.phone,
                college: finalCollege,
                transaction_id: formData.transaction_id,
                screenshot_url: screenshot_url,
                assigned_qr_id: assignedQR.id,
            });

            router.push("/success");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-28 pb-20 px-4">
            <div className="max-w-xl mx-auto">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 -translate-y-1/2 -z-10 transition-all duration-500"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${s <= step ? "bg-black border-cyan-500 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-black border-white/10 text-white/30"
                                }`}
                        >
                            {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold mb-2">Registration</h1>
                                    <p className="text-white/40">Enter your basic details to start</p>
                                </div>

                                <div className="space-y-4">
                                    <Input label="Full Name" icon={User} placeholder="John Doe" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                                    <Input label="Registration Number" icon={Hash} placeholder="22091A05XX" value={formData.reg_no} onChange={(v) => setFormData({ ...formData, reg_no: v })} />
                                    <Input label="Email Address" icon={Mail} placeholder="john@example.com" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                                    <Input label="Phone Number" icon={Phone} placeholder="9876543210" value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} />

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Select College Name</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { id: 'RGM', label: 'RGM College' },
                                                { id: 'OTHERS', label: 'Other' }
                                            ].map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setFormData({ ...formData, college: c.id })}
                                                    className={`py-3 rounded-xl border transition-all ${formData.college === c.id ? "border-cyan-500 bg-cyan-500/10 text-cyan-500" : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {c.label}
                                                </button>
                                            ))}
                                        </div>

                                        {formData.college === 'OTHERS' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="pt-2"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Enter your college name"
                                                    value={formData.otherCollege}
                                                    onChange={(e) => setFormData({ ...formData, otherCollege: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 transition-all text-sm placeholder:text-white/20"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {error && <ErrorMessage message={error} />}

                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Continue to Payment <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold mb-2">Payment</h1>
                                    <p className="text-white/40">Scan the QR code to pay ₹800</p>
                                </div>

                                {loading ? (
                                    <div className="h-64 flex items-center justify-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
                                    </div>
                                ) : assignedQR ? (
                                    <div className="space-y-6">
                                        <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto relative group">
                                            <Image
                                                src={assignedQR.qr_image_url}
                                                alt="Payment QR"
                                                width={192}
                                                height={192}
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Scan to Pay</span>
                                            </div>
                                        </div>

                                        <div className="text-center space-y-1">
                                            <p className="text-sm text-white/60">UPI ID</p>
                                            <p className="text-lg font-mono text-cyan-400">{assignedQR.upi_id}</p>
                                        </div>

                                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                            <p className="text-xs text-yellow-500/90 leading-relaxed">
                                                Important: Take a screenshot of the payment confirmation and keep the Transaction ID (UTR) ready.
                                            </p>
                                        </div>

                                        {error && <ErrorMessage message={error} />}

                                        <button
                                            onClick={handleNext}
                                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold flex items-center justify-center gap-2"
                                        >
                                            I have paid <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setStep(1)} className="w-full text-white/40 text-sm hover:text-white transition-colors">Go Back</button>
                                    </div>
                                ) : (
                                    <ErrorMessage message={error || "Could not load payment info."} />
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold mb-2">Verify Payment</h1>
                                    <p className="text-white/40">Upload proof of your transaction</p>
                                </div>

                                <div className="space-y-4">
                                    <Input
                                        label="Transaction ID (UTR)"
                                        icon={CreditCard}
                                        placeholder="12 digit UTR number"
                                        value={formData.transaction_id}
                                        onChange={(v) => setFormData({ ...formData, transaction_id: v })}
                                    />

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Screenshot</label>
                                        <div className="relative h-40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-cyan-500/30 transition-colors bg-white/5 overflow-hidden">
                                            {formData.screenshot ? (
                                                <div className="flex items-center gap-2 text-cyan-400">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                    <span className="text-sm font-medium">{formData.screenshot.name}</span>
                                                    <button onClick={() => setFormData({ ...formData, screenshot: null })} className="text-xs text-white/40 underline ml-2">Change</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-white/20" />
                                                    <span className="text-sm text-white/40">Click to upload screenshot</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setFormData({ ...formData, screenshot: e.target.files?.[0] || null })}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {error && <ErrorMessage message={error} />}

                                <button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "Submit Registration"}
                                </button>
                                <button onClick={() => setStep(2)} className="w-full text-white/40 text-sm hover:text-white transition-colors" disabled={loading}>Go Back</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function Input({ label, icon: Icon, placeholder, value, onChange }: {
    label: string,
    icon: any,
    placeholder: string,
    value: string,
    onChange: (v: string) => void
}) {
    return (
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 ml-1">{label}</label>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-white/20"
                />
            </div>
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 text-red-500 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {message}
        </div>
    );
}
