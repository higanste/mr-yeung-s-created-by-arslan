"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Code, Heart, Zap } from "lucide-react";

interface MissionProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Mission({ isOpen, onClose }: MissionProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-3xl glass-panel p-8 md:p-12 rounded-3xl border border-neon-cyan/20 shadow-[0_0_50px_rgba(0,242,234,0.1)] overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-[100px] pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10 space-y-12">
                            {/* Header */}
                            <div className="text-center space-y-4">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="w-20 h-20 mx-auto bg-gradient-to-tr from-neon-cyan to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3"
                                >
                                    <span className="font-space-grotesk font-bold text-3xl text-black">MY</span>
                                </motion.div>
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-black font-space-grotesk tracking-tight text-white"
                                >
                                    Our Mission
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg text-gray-400 font-mono uppercase tracking-widest"
                                >
                                    Empowering Class M10E-2
                                </motion.p>
                            </div>

                            {/* Content Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <Section
                                    icon={<Zap className="text-yellow-400" />}
                                    title="The Goal"
                                    delay={0.4}
                                >
                                    To create the ultimate interactive classroom tool that makes learning match excitement. No more boring PDFs—just pure, interactive chaos and learning combined.
                                </Section>

                                <Section
                                    icon={<Code className="text-neon-cyan" />}
                                    title="The Developer"
                                    delay={0.5}
                                >
                                    Built by <strong className="text-white">Arslan</strong>. Dedicated to pushing the boundaries of what a "school project" can be. Powered by Next.js, fueled by late-night coding sessions.
                                </Section>
                            </div>

                            {/* Footer Quote */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-center pt-8 border-t border-white/10"
                            >
                                <p className="text-gray-500 italic">
                                    "Mechanics isn't everything. It's about the experience."
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function Section({ title, children, icon, delay }: { title: string, children: React.ReactNode, icon: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay }}
            className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-black/50 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="font-bold text-xl text-white">{title}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
                {children}
            </p>
        </motion.div>
    );
}
