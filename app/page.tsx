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
import { motion } from "framer-motion";

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
    <main className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan shadow-[0_0_15px_rgba(0,242,234,0.3)]">
            <span className="font-bold text-neon-cyan">MY</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Mr. Yeung&#39;s Math Challenge</h1>
            <p className="text-xs text-gray-400">Class Tool • v1.0</p>
          </div>
        </div>

        <Timer />
      </header>

      {/* Controls Bar */}
      <div className="sticky top-0 z-30 w-full backdrop-blur-md bg-black/30 border-b border-white/5 py-4 px-6 mb-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <TopicSelector
            selectedTopic={selectedTopic}
            onSelect={(t) => {
              setSelectedTopic(t);
            }}
          />

          <button
            onClick={handleGenerate}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <RefreshCcw size={18} /> Generate
          </button>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all border ${showAnswers ? 'bg-neon-green/20 border-neon-green text-neon-green' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
          >
            {showAnswers ? <><EyeOff size={18} /> Hide Answers</> : <><Eye size={18} /> Show Answers</>}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Sliders size={16} /> Options
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="w-full max-w-7xl px-6 mb-8 overflow-hidden"
        >
          <div className="glass-panel p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Difficulty (1-10)</label>
              <input
                type="range" min="1" max="10"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full accent-neon-cyan"
              />
              <div className="text-right text-neon-cyan font-mono">{difficulty}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Questions Count</label>
              <input
                type="range" min="5" max="50" step="5"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-neon-pink"
              />
              <div className="text-right text-neon-pink font-mono">{count}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Grid Columns</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(c => (
                  <button
                    key={c}
                    onClick={() => setColumns(c)}
                    className={`flex-1 py-1 rounded ${columns === c ? 'bg-white text-black font-bold' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <QuestionGrid questions={questions} showAnswers={showAnswers} columns={columns} />

      {/* Roaster / Picker */}
      <div className="w-full px-6 mt-16 pt-16 border-t border-white/5 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-center text-xl font-bold mb-8 text-gray-500 uppercase tracking-widest">Classroom Utils</h2>
        <RosterPicker />
      </div>

      <Footer />
    </main>
  );
}
