"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    onFinish?: () => void;
}

export function Timer({ onFinish }: Props) {
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Ref to hold audio for cleanup
    const beepRef = useRef<HTMLAudioElement | null>(null);

    // Setup audio
    useEffect(() => {
        // We assume these files will exist in /public/sounds/
        beepRef.current = new Audio('/sounds/beep.mp3');
        beepRef.current.volume = 0.5;
    }, []);

    const playBeep = (freq: 'normal' | 'high') => {
        if (isMuted || !beepRef.current) return;

        // Create new instance for overlapping sounds
        const aud = new Audio('/sounds/beep.mp3');
        if (freq === 'high') aud.playbackRate = 1.5;
        aud.play().catch(e => console.log("Audio play failed", e));
    };

    const playVictory = () => {
        if (isMuted) return;
        const aud = new Audio('/sounds/victory.mp3');
        aud.play().catch(e => console.log("Victory play failed", e));
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    const newVal = prev - 1;

                    // Sound effects logic
                    if (newVal <= 10 && newVal > 0) {
                        playBeep(newVal <= 3 ? 'high' : 'normal');
                    }

                    if (newVal === 0) {
                        setIsRunning(false);
                        playVictory();
                        if (onFinish) onFinish();
                    }

                    return newVal;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isMuted, onFinish]);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const addTime = (s: number) => {
        setTimeLeft(prev => prev + s);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Main Display */}
            <div className={`relative px-8 py-4 glass-panel rounded-2xl border transition-all duration-300 ${timeLeft <= 10 && timeLeft > 0 ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse' : 'border-white/10'}`}>
                <div className="text-6xl font-bold font-mono tracking-widest text-shadow-lg">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                <button onClick={() => addTime(60)} className="btn-secondary">+1m</button>
                <button onClick={() => addTime(180)} className="btn-secondary">+3m</button>
                <button onClick={() => addTime(300)} className="btn-secondary">+5m</button>
                <div className="w-4" /> {/* Spacer */}

                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`p-3 rounded-full transition-all ${isRunning ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                >
                    {isRunning ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                    onClick={() => { setIsRunning(false); setTimeLeft(0); }}
                    className="p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>
        </div>
    );
}
