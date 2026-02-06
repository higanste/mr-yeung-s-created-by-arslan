"use client";

import { Question } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    questions: Question[];
    showAnswers: boolean;
    onToggleAnswers: () => void;
    onRefreshQuestion: (index: number) => void;
}

export function QuestionGrid({ questions, showAnswers, onToggleAnswers, onRefreshQuestion }: Props) {
    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-end">
                <button
                    onClick={onToggleAnswers}
                    className="text-neon-cyan hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border border-neon-cyan/20 hover:border-white/20 px-4 py-2 rounded-lg bg-neon-cyan/5 hover:bg-white/5"
                >
                    {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                <AnimatePresence>
                    {questions.map((q, i) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="group glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all hover:bg-white/5 relative flex flex-col items-center justify-center min-h-[200px]"
                            onClick={() => onRefreshQuestion(i)}
                            title="Click to refresh question"
                        >
                            <span className="absolute top-4 left-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Question {i + 1}</span>

                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center font-space-grotesk tracking-wide text-shadow">
                                {q.question}
                            </h3>

                            <div className="h-12 flex items-center justify-center w-full mt-2">
                                <AnimatePresence mode="wait">
                                    {showAnswers ? (
                                        <motion.span
                                            key="ans"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="text-3xl font-bold text-neon-green drop-shadow-[0_0_10px_rgba(10,255,0,0.5)] font-space-grotesk"
                                        >
                                            {q.answer}
                                        </motion.span>
                                    ) : (
                                        <motion.div
                                            key="hidden"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-16 h-1 bg-white/10 group-hover:bg-neon-cyan/50 transition-colors rounded-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
