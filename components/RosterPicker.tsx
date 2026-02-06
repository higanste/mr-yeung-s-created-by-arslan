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
            // Remove emojis using regex
            const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => v.name.includes('Google US English')) || voices[0];
            if (preferred) utterance.voice = preferred;
            utterance.rate = 1.1;
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

        // Play Sound Effect (using victory sound for now)
        try {
            const audio = new Audio('/sounds/victory.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed", e));
        } catch (e) {
            console.error("Audio error", e);
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
        <div className="relative">
            <div className={`${selectedStudent || isSpinning ? "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xl" : ""}`}>
                {/* Only show "Roll" button inline, but show RESULT as full screen overlay */}

                <div className={`${selectedStudent || isSpinning ? "w-full max-w-2xl glass-panel p-10 rounded-3xl border border-neon-pink/20 shadow-[0_0_50px_rgba(255,0,85,0.2)]" : "w-auto"}`}>

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-cyan/5 pointer-events-none" />

                    {!selectedStudent && !isSpinning && (
                        <div className="text-center z-10 flex items-center gap-4">
                            <button
                                onClick={spin}
                                className="bg-white/10 hover:bg-neon-pink/20 text-white hover:text-neon-pink border border-white/10 hover:border-neon-pink transition-all px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-neon-pink/20"
                            >
                                <User size={16} /> Roll Roster
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

            {/* Close Overlay Button */}
            {(selectedStudent || isSpinning) && (
                <button
                    onClick={() => {
                        setSelectedStudent(null);
                        setIsSpinning(false);
                        setShowMessage(false);
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                    }}
                    className="fixed top-8 right-8 z-[60] bg-white/10 p-3 rounded-full hover:bg-white/20 text-white"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
            )}
        </div>
    );
}

function RefreshCw({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
    )
}
