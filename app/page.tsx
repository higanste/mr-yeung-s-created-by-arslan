"use client";

import { useState, useEffect } from "react";
import { generateQuestions, Question } from "@/lib/generator";
import { Topic, TOPICS } from "@/lib/topics";
import { TopicSelector } from "@/components/TopicSelector";
import { QuestionGrid } from "@/components/QuestionGrid";
import { Timer } from "@/components/Timer";
import { RosterPicker } from "@/components/RosterPicker";
import { Footer } from "@/components/Footer";
import { Sliders, RefreshCcw, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TOPICS[0]); // Default to first
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  // Settings
  const [difficulty, setDifficulty] = useState(1);
  const [count, setCount] = useState(10);
  const [columns, setColumns] = useState(2);
  const [showSettings, setShowSettings] = useState(false);

  const handleGenerate = () => {
    const q = generateQuestions(selectedTopic.id, count, difficulty);
    setQuestions(q);
    setShowAnswers(false);
  };

  // Generate on mount
  useEffect(() => {
    handleGenerate();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <main className="h-screen w-full flex flex-col bg-bg-deep overflow-hidden">
      {/* Header - Fixed Height */}
      <header className="flex-none w-full p-4 flex justify-between items-center z-40 bg-black/40 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan shadow-[0_0_15px_rgba(0,242,234,0.3)]">
            <span className="font-bold text-neon-cyan">MY</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-0 leading-none">Mr. Yeung&#39;s Math Challenge</h1>
            <p className="text-xs text-gray-500 mt-1">Class Tool • v1.1</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Timer />
          <button onClick={() => setShowSettings(!showSettings)} className="text-gray-400 hover:text-white transition-colors">
            <Sliders size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area - FLEX GROW to fill screen */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Controls Bar */}
        <div className="flex-none p-4 flex flex-wrap justify-between items-center gap-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <TopicSelector
              selectedTopic={selectedTopic}
              onSelect={(t) => {
                setSelectedTopic(t);
              }}
            />

            <button
              onClick={handleGenerate}
              className="btn-primary flex items-center gap-2 px-6 py-2 text-sm uppercase tracking-wider"
            >
              <RefreshCcw size={16} /> Generate
            </button>

            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${showAnswers ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
            >
              {showAnswers ? <><EyeOff size={16} /> Answers Visible</> : <><Eye size={16} /> Show Answers</>}
            </button>
          </div>
        </div>

        {/* Settings Panel Overlay */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full z-30 p-4 bg-black/90 backdrop-blur-xl border-b border-neon-cyan/20 shadow-2xl"
            >
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-widest font-mono">Difficulty</label>
                  <input
                    type="range" min="1" max="10"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="w-full accent-neon-cyan h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-right text-neon-cyan font-mono text-xl">{difficulty}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-widest font-mono">Count</label>
                  <input
                    type="range" min="4" max="20" step="2"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full accent-neon-pink h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-right text-neon-pink font-mono text-xl">{count}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase tracking-widest font-mono">Columns</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(c => (
                      <button
                        key={c}
                        onClick={() => setColumns(c)}
                        className={`flex-1 py-2 rounded text-sm font-mono ${columns === c ? 'bg-white text-black font-bold' : 'bg-white/5 hover:bg-white/10'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Grid - FILLS REMAINING SPACE */}
        {/* Question Grid - FILLS REMAINING SPACE */}
        <div className="flex-1 w-full p-4 overflow-hidden relative">
          <QuestionGrid questions={questions} showAnswers={showAnswers} columns={columns} />
        </div>

        {/* Roaster / Picker - Absolute Bottom Right or Toggle? Let's make it a small persistent integrated bar at bottom */}
        <div className="flex-none border-t border-white/5 bg-black/40 backdrop-blur-sm p-3 flex justify-between items-center px-6">
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Mr. Yeung&#39;s Class • 2026</span>
          <RosterPicker />
        </div>
      </div>
    </main>
  );
}
