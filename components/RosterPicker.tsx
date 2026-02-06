"use client";

import { getRandomRoast, getRandomStudent, PRAISES, Student } from "@/lib/roster";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Skull, User, Mic } from "lucide-react";
import { useEffect, useState } from "react";

export function RosterPicker() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");
    const [messageType, setMessageType] = useState<'roast' | 'praise' | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [usedRoasts, setUsedRoasts] = useState<string[]>([]);

    // Load used roasts on mount
    useEffect(() => {
        const saved = localStorage.getItem('used_roasts');
        if (saved) {
            try {
                setUsedRoasts(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse used roasts", e);
            }
        }
    }, []);

    const saveUsedRoast = (roast: string) => {
        const newUsed = [...usedRoasts, roast];
        // Keep history manageable, maybe max 50? User said "don't use it again... not tomorrow".
        // Let's keep last 200 to be safe.
        if (newUsed.length > 200) newUsed.shift();

        setUsedRoasts(newUsed);
        localStorage.setItem('used_roasts', JSON.stringify(newUsed));
    };

    // Text-To-Speech
    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            // Try to find a specific fun voice if available, otherwise default
            // "Google US English" is usually decent.
            const preferred = voices.find(v => v.name.includes('Google US English')) || voices[0];
            if (preferred) utterance.voice = preferred;
            utterance.rate = 1.1;
            // Pitch shift: Roasts deeper, Praise higher
            utterance.pitch = messageType === 'roast' ? 0.8 : 1.2;

            window.speechSynthesis.speak(utterance);
        }
    };

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setSelectedStudent(null);
        setMessageType(null);
        setShowMessage(false);
        setDisplayMessage("");
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any previous speech
        }

        let count = 0;
        const maxSpins = 20;
        const interval = setInterval(() => {
            setSelectedStudent(getRandomStudent());
            count++;
            if (count > maxSpins) {
                clearInterval(interval);
                finishSpin();
            }
        }, 80);
    };

    const finishSpin = () => {
        const winner = getRandomStudent(); // Final winner logic
        setSelectedStudent(winner);
        setIsSpinning(false);

        // Determines Type
        let type: 'roast' | 'praise' = 'praise';
        if (winner.name.includes('Abdullah')) {
            // Abdullah: High chance of roast
            type = Math.random() < 0.7 ? 'roast' : 'praise';
        } else {
            // Others: mostly praise, occasional roast for fun
            type = Math.random() < 0.3 ? 'roast' : 'praise';
        }

        if (winner.role === 'Teacher') type = 'praise'; // Always respect the teacher

        setMessageType(type);

        let msg = "";
        if (type === 'roast') {
            msg = getRandomRoast(winner.name, usedRoasts);
            saveUsedRoast(msg);
        } else {
            msg = PRAISES[Math.floor(Math.random() * PRAISES.length)];
        }

        setTimeout(() => {
            setShowMessage(true);
            typewrite(msg);

            let intro = "";
            if (type === 'roast') {
                const intros = ["Oh no.", "Yikes.", "Listen up.", "Roast incoming.", "Bruh."];
                intro = intros[Math.floor(Math.random() * intros.length)];
            } else {
                const intros = ["Great job!", "Nice work!", "Look at that!", "Wow!"];
                intro = intros[Math.floor(Math.random() * intros.length)];
            }

            speak(`${intro} ${winner.name}. ${msg}`);
        }, 500);
    };

    const typewrite = (text: string) => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayMessage(text.substring(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, 30);
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col items-center gap-6 min-h-[350px] justify-center relative overflow-hidden shadow-2xl">

                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-cyan/5 pointer-events-none" />

                {!selectedStudent && !isSpinning && (
                    <div className="text-center z-10">
                        <h3 className="text-2xl font-bold mb-6 text-gray-200">Classroom Randomizer</h3>
                        <button
                            onClick={spin}
                            className="btn-primary flex items-center gap-3 px-10 py-5 text-xl tracking-wide"
                        >
                            <User size={24} /> Pick Student
                        </button>
                    </div>
                )}

                {(selectedStudent || isSpinning) && (
                    <div className="flex flex-col items-center z-10 w-full">
                        <motion.div
                            key={selectedStudent?.name}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl font-black font-space-grotesk text-center mb-2 tracking-tighter text-white drop-shadow-xl"
                        >
                            {selectedStudent?.name}
                        </motion.div>

                        <div className="text-sm font-mono text-gray-400 mb-8 uppercase tracking-widest border px-3 py-1 rounded-full border-white/10">
                            {selectedStudent?.role === 'Teacher' ? 'Teacher' : `Student • Grade ${selectedStudent?.grade}`}
                        </div>

                        {showMessage && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`p-8 rounded-2xl border-l-4 w-full max-w-2xl shadow-lg relative overflow-hidden backdrop-blur-md ${messageType === 'roast' ? 'bg-red-500/10 border-red-500 text-red-100 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'bg-green-500/10 border-green-500 text-green-100 shadow-[0_0_30px_rgba(34,197,94,0.2)]'}`}
                            >
                                {/* Decorative Icon */}
                                <div className="absolute -right-6 -bottom-6 opacity-10">
                                    {messageType === 'roast' ? <Skull size={100} /> : <Sparkles size={100} />}
                                </div>

                                <div className="flex items-start gap-4 relative z-10">
                                    {messageType === 'roast' ? <Skull className="shrink-0 text-red-500 mt-1" size={28} /> : <Sparkles className="shrink-0 text-green-500 mt-1" size={28} />}
                                    <p className="text-2xl font-bold leading-tight font-space-grotesk">
                                        {displayMessage}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {!isSpinning && (
                            <button onClick={spin} className="mt-8 text-sm text-gray-500 hover:text-white flex items-center gap-2 transition-colors hover:bg-white/5 px-4 py-2 rounded-lg">
                                <RefreshCw size={14} /> Spin Again
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function RefreshCw({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
    )
}
