"use client";

import { motion } from "framer-motion";
import { Home, Maximize, Minimize, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
    onMissionClick: () => void;
}

export function Navbar({ onMissionClick }: NavbarProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(e => console.error(e));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(e => console.error(e));
        }
    };

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    return (
        <nav className="flex items-center gap-2">
            <NavButton
                label="Home"
                icon={<Home size={18} />}
                onClick={() => window.location.reload()} // Simple refresh for "Home"
            />
            <NavButton
                label="Our Mission"
                icon={<Info size={18} />}
                onClick={onMissionClick}
            />
            <NavButton
                label={isFullscreen ? "Exit Full" : "Fullscreen"}
                icon={isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                onClick={toggleFullscreen}
                active={isFullscreen}
            />
        </nav>
    );
}

function NavButton({ label, icon, onClick, active }: { label: string, icon: React.ReactNode, onClick: () => void, active?: boolean }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all
                ${active
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan shadow-[0_0_15px_rgba(0,242,234,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10'}
            `}
        >
            {icon}
            <span className="hidden md:inline">{label}</span>
        </motion.button>
    );
}
