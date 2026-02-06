"use client";

import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface TimerProps {
    onFinish: () => void;
}

export function Timer({ onFinish }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
    const [isRunning, setIsRunning] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Sound refs
    const beepRef = useRef<HTMLAudioElement | null>(null);
    const endRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        beepRef.current = new Audio('/sounds/click.mp3');
        endRef.current = new Audio('/sounds/click.mp3'); // Fallback finish sound
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    // INTENSE MODE: Last 10 Seconds
                    if (prev <= 11 && prev > 1 && !isMuted) {
                        try {
                            // Play a ticking sound (reusing click for now as placeholder for "tick")
                            const tick = new Audio('/sounds/click.mp3');
                            tick.volume = 0.5 + ((10 - prev) * 0.05); // Get louder
                            tick.playbackRate = 1.5; // Faster tick
                            tick.play().catch(() => { });
                        } catch (e) { }
                    }

                    if (prev <= 1) {
                        onFinish();
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isMuted, onFinish]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (

        <div className={`flex flex-col md:flex-row items-center gap-4 border px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-300 ${timeLeft <= 10 && timeLeft > 0 && isRunning ? 'bg-red-500/20 border-red-500 animate-shake shadow-[0_0_50px_rgba(255,0,0,0.4)]' : 'bg-white/5 border-white/10'}`}>
            {/* Display */}
            <div className={`font-mono text-4xl font-bold tracking-widest tabular-nums ${timeLeft <= 10 && timeLeft > 0 ? 'text-red-500 animate-pulse scale-110' : 'text-white'}`}>
                {formatTime(timeLeft)}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center items-center gap-2">
                {!isRunning ? (
                    <>
                        <div className="flex flex-col gap-1 mr-2 items-center">
                            {/* QUICK ADDS */}
                            <div className="flex gap-1">
                                <button onClick={() => setTimeLeft(60)} className="px-2 py-1 text-xs bg-white/5 hover:bg-neon-cyan/20 text-gray-400 hover:text-neon-cyan rounded transition-colors border border-white/5">+1m</button>
                                <button onClick={() => setTimeLeft(180)} className="px-2 py-1 text-xs bg-white/5 hover:bg-neon-cyan/20 text-gray-400 hover:text-neon-cyan rounded transition-colors border border-white/5">+3m</button>
                                <button onClick={() => setTimeLeft(300)} className="px-2 py-1 text-xs bg-white/5 hover:bg-neon-cyan/20 text-gray-400 hover:text-neon-cyan rounded transition-colors border border-white/5">+5m</button>
                            </div>
                            {/* CUSTOM INPUT */}
                            <input
                                type="text"
                                placeholder="Custom (m)"
                                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neon-cyan text-center transition-colors placeholder:text-gray-600"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const val = parseFloat(e.currentTarget.value);
                                        if (!isNaN(val) && val > 0) {
                                            setTimeLeft(Math.floor(val * 60));
                                            e.currentTarget.value = "";
                                        }
                                    }
                                }}
                            />
                        </div>

                        <button
                            onClick={() => setIsRunning(true)}
                            className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/50 p-3 rounded-full transition-all hover:scale-105 active:scale-95"
                        >
                            <Play size={20} fill="currentColor" />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsRunning(false)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 p-3 rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        <Pause size={20} fill="currentColor" />
                    </button>
                )}

                <button
                    onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(0);
                    }}
                    className="hover:bg-white/10 text-gray-400 hover:text-red-400 p-2 rounded-full transition-colors"
                >
                    <RotateCcw size={16} />
                </button>

                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-full transition-colors ${isMuted ? 'text-red-400 bg-red-400/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
            </div>
        </div>
    );
}
