"use client";

import { motion } from "framer-motion";
import { TOPICS, TopicCategory } from "@/lib/topics";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    onSelect: (topicId: string) => void;
    currentTopic: string;
}

export function TopicSelector({ onSelect, currentTopic }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const categories: TopicCategory[] = ['Number', 'Algebra', 'Geometry', 'Data'];

    const getTopicName = (id: string) => TOPICS.find(t => t.id === id)?.name || "Select Topic";

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all border border-white/10 w-full md:w-auto justify-between"
            >
                <span className="font-bold text-lg tracking-tight truncate max-w-[200px]">
                    {getTopicName(currentTopic)}
                </span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-4 w-full md:w-[600px] glass-panel rounded-2xl p-6 border border-white/20 shadow-2xl backdrop-blur-xl bg-black/80 max-h-[60vh] overflow-y-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categories.map((cat) => (
                            <div key={cat}>
                                <h3 className="text-neon-cyan font-bold mb-3 uppercase tracking-wider text-sm border-b border-white/10 pb-1">{cat}</h3>
                                <div className="space-y-1">
                                    {TOPICS.filter(t => t.category === cat).map(topic => (
                                        <button
                                            key={topic.id}
                                            onClick={() => {
                                                onSelect(topic.id);
                                                setIsOpen(false);
                                            }}
                                            className={`block w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${currentTopic === topic.id ? 'bg-neon-cyan/20 text-neon-cyan font-bold' : 'hover:bg-white/5 text-gray-300'}`}
                                        >
                                            {topic.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
