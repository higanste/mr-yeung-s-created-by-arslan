"use client";

import { getRandomRoast, getRandomStudent, PRAISES, Student } from "@/lib/roster";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Skull, User, Mic } from "lucide-react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface RosterRef {
    spin: () => void;
}

export const RosterPicker = forwardRef<RosterRef>((props, ref) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");
    const [messageType, setMessageType] = useState<'roast' | 'praise' | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [usedRoasts, setUsedRoasts] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useImperativeHandle(ref, () => ({
        spin
    }));

    // Load used roasts on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('used_roasts');
            if (saved) {
                try {
                    setUsedRoasts(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse used roasts", e);
                }
            }
        }
    }, []);

    const saveUsedRoast = (roast: string) => {
        const newUsed = [...usedRoasts, roast];
        if (newUsed.length > 200) newUsed.shift();
        setUsedRoasts(newUsed);
        localStorage.setItem('used_roasts', JSON.stringify(newUsed));
    };

    // Text-To-Speech
    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any previous speech
            const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);

            // Try to find a "good" voice
            const voices = window.speechSynthesis.getVoices();
            // User requested "real human free voice". "Google US English" is usually the best free browser one.
            const preferred = voices.find(v => v.name.includes('Google US English')) ||
                voices.find(v => v.name.includes('Microsoft Zira')) ||
                voices.find(v => v.lang.startsWith('en-US')) ||
                voices[0];

            if (preferred) utterance.voice = preferred;
            utterance.rate = 1.0; // Slightly slower for clarity
            utterance.pitch = 1.0; // Natural pitch
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
            window.speechSynthesis.cancel();
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
        const winner = getRandomStudent();
        setSelectedStudent(winner);
        setIsSpinning(false);

        let type: 'roast' | 'praise' = 'praise';
        if (winner.name.includes('Abdullah')) {
            type = Math.random() < 0.7 ? 'roast' : 'praise';
        } else {
            type = Math.random() < 0.3 ? 'roast' : 'praise';
        }

        if (winner.role === 'Teacher') type = 'praise';

        setMessageType(type);

        let msg = "";
        if (type === 'roast') {
            msg = getRandomRoast(winner.name, usedRoasts);
            saveUsedRoast(msg);
        } else {
            msg = PRAISES[Math.floor(Math.random() * PRAISES.length)];
        }

        try {
            // Replaced inappropriate sounds with a simple "pop" or "click" for feedback
            const soundFile = '/sounds/click.mp3';
            const audio = new Audio(soundFile);
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
                const intros = ["Damn.", "Listen.", "Hold up.", "Yo.", "Real talk."];
                intro = intros[Math.floor(Math.random() * intros.length)];
            } else {
                const intros = ["Nice.", "W.", "Let's go.", "Huge W."];
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

    const OverlayContent = (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-3xl animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            {/* Close Button */}
            <button
                onClick={() => {
                    setSelectedStudent(null);
                    setIsSpinning(false);
                    setShowMessage(false);
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                className="absolute top-6 right-6 z-[110] bg-white/10 p-3 rounded-full hover:bg-white/20 text-white transition-colors border border-white/10"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <div className="relative w-full max-w-4xl glass-panel p-12 rounded-[2rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-cyan/5 pointer-events-none rounded-[2rem]" />

                {(selectedStudent || isSpinning) && (
                    <div className="flex flex-col items-center z-10 w-full text-center">
                        <motion.div
                            key={selectedStudent?.name}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl md:text-8xl font-black font-space-grotesk text-center mb-6 tracking-tighter text-white drop-shadow-2xl"
                        >
                            {selectedStudent?.name}
                        </motion.div>

                        <div className="text-xl font-mono text-gray-400 mb-12 uppercase tracking-[0.5em] border px-6 py-2 rounded-full border-white/10 bg-black/20">
                            {selectedStudent?.role === 'Teacher' ? 'Teacher' : `Student • Grade ${selectedStudent?.grade}`}
                        </div>

                        {showMessage && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`p-10 rounded-3xl border-l-8 w-full shadow-2xl relative overflow-hidden backdrop-blur-md ${messageType === 'roast' ? 'bg-red-500/10 border-red-500 text-red-100' : 'bg-green-500/10 border-green-500 text-green-100'}`}
                            >
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    {messageType === 'roast' ? <Skull size={200} /> : <Sparkles size={200} />}
                                    {messageType === 'roast' ? <Skull size={200} /> : <Sparkles size={200} />}
                                </div>

                                <div className="flex flex-col items-center gap-6 relative z-10">
                                    {messageType === 'roast' ? <Skull className="text-red-500" size={48} /> : <Sparkles className="text-green-500" size={48} />}
                                    <p className="text-3xl md:text-4xl font-bold leading-tight font-space-grotesk">
                                        &quot;{displayMessage}&quot;
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {!isSpinning && !showMessage && (
                            <div className="animate-pulse text-neon-cyan mt-8">Spinning...</div>
                        )}

                        {!isSpinning && showMessage && (
                            <button onClick={spin} className="mt-12 text-gray-400 hover:text-white flex items-center gap-3 transition-colors hover:bg-white/5 px-6 py-3 rounded-xl border border-transparent hover:border-white/10">
                                <RefreshCw size={20} /> Spin Again
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            <div className="relative z-10">
                {!selectedStudent && !isSpinning && (
                    <button
                        onClick={spin}
                        className="bg-white/10 hover:bg-neon-pink/20 text-white hover:text-neon-pink border border-white/10 hover:border-neon-pink transition-all px-6 py-3 rounded-xl flex items-center gap-3 text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-neon-pink/20"
                    >
                        <User size={18} /> Roll Roster
                    </button>
                )}
            </div>

            {mounted && (selectedStudent || isSpinning) && createPortal(OverlayContent, document.body)}
        </>
    );
});
RosterPicker.displayName = "RosterPicker";

function RefreshCw({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
    )
}
