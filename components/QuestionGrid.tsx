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
            className="grid gap-6 w-full max-w-7xl mx-auto p-4 transition-all duration-500"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            <AnimatePresence>
                {questions.map((q, i) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all hover:bg-white/5 relative flex flex-col items-center justify-center min-h-[160px]"
                    >
                        <span className="absolute top-3 left-4 text-xs font-mono text-gray-500">Q{i + 1}</span>

                        <h3 className="text-3xl font-bold text-white mb-4 text-center font-space-grotesk tracking-wide text-shadow">
                            {q.question}
                        </h3>

                        <div className="h-8 flex items-center justify-center w-full">
                            <AnimatePresence mode="wait">
                                {showAnswers ? (
                                    <motion.span
                                        key="ans"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-2xl font-bold text-neon-green"
                                    >
                                        {q.answer}
                                    </motion.span>
                                ) : (
                                    <motion.div
                                        key="hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-[2px] bg-white/10 group-hover:bg-white/20 transition-colors"
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
