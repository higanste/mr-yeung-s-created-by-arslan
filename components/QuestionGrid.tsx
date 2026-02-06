"use client";

import { Question } from "@/lib/generator";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Props {
    questions: Question[];
    showAnswers: boolean;
    columns: number;
}

export function QuestionGrid({ questions, showAnswers, columns }: Props) {
    // Local state to track individually revealed answers if we wanted, 
    // but global toggle is requested. We can add individual toggles too.

    return (
        <div
            className="grid gap-4 w-full h-full p-2 transition-all duration-500 overflow-y-auto"
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                // Auto-fit rows to fill height effectively? No, simpler to just scroll if needed but keep them compact
                gridAutoRows: "minmax(0, 1fr)"
            }}
        >
            <AnimatePresence>
                {questions.map((q, i) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="group glass-card p-4 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-all hover:bg-white/5 relative flex flex-col items-center justify-center h-full w-full"
                    >
                        <span className="absolute top-2 left-3 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Question {i + 1}</span>

                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center font-space-grotesk tracking-wide text-shadow">
                            {q.question}
                        </h3>

                        <div className="h-10 flex items-center justify-center w-full mt-2">
                            <AnimatePresence mode="wait">
                                {showAnswers ? (
                                    <motion.span
                                        key="ans"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="text-3xl font-bold text-neon-green drop-shadow-[0_0_10px_rgba(10,255,0,0.5)]"
                                    >
                                        {q.answer}
                                    </motion.span>
                                ) : (
                                    <motion.div
                                        key="hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-1/3 h-[2px] bg-white/10 group-hover:bg-neon-cyan/50 transition-colors"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
