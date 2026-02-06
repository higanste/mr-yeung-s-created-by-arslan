"use client";

import { Footer } from "@/components/Footer";
import { QuestionGrid } from "@/components/QuestionGrid";
import { RosterPicker, RosterRef } from "@/components/RosterPicker";
import { Timer } from "@/components/Timer";
import { TopicSelector } from "@/components/TopicSelector";
import { generateQuestion } from "@/lib/generator";
import { Question } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Settings, RefreshCw, Grid2X2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Mission } from "@/components/Mission";

export default function Home() {
  const [difficulty, setDifficulty] = useState(1);
  const [topic, setTopic] = useState("number");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showMission, setShowMission] = useState(false);

  const rosterRef = useRef<RosterRef>(null);

  const generateNewQuestions = () => {
    const newQs = Array(6).fill(null).map((_, i) => generateQuestion(topic, difficulty));
    setQuestions(newQs);
    setShowAnswers(false);
  };

  useEffect(() => {
    generateNewQuestions();
  }, [topic, difficulty]);

  const handleTimerFinish = () => {
    if (rosterRef.current) {
      rosterRef.current.spin();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-neon-cyan/30 selection:text-neon-cyan pt-20">
      {/* Background Noise/Gradient */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-neon-pink to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-neon-pink/20">
            <span className="font-space-grotesk font-bold text-xl text-white">MY</span>
          </div>
          <div>
            <h1 className="text-2xl font-black font-space-grotesk tracking-tight text-white">
              Mr Yeungs <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">M10E-2</span>
            </h1>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Math Challenge v2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Navbar onMissionClick={() => setShowMission(true)} />
        </div>
      </header>

      {/* Control Bar */}
      <div className="relative z-40 border-b border-white/5 bg-white/5 backdrop-blur-sm p-4 flex flex-wrap items-center justify-center gap-6">
        <Timer onFinish={handleTimerFinish} />

        <div className="h-8 w-px bg-white/10 hidden md:block" />

        <div className="flex items-center gap-4">
          <button onClick={() => setShowSettings(!showSettings)} className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-xl transition-all border border-white/5 hover:border-white/10 flex items-center gap-2">
            <Settings size={20} className={showSettings ? "animate-spin-slow" : ""} />
            <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Settings</span>
          </button>

          <button onClick={generateNewQuestions} className="bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/20 hover:border-neon-cyan/50 p-3 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,234,0.1)] hover:shadow-[0_0_30px_rgba(0,242,234,0.2)]">
            <RefreshCw size={20} />
            <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* SETTINGS PANEL OVERLAY */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-0 left-0 w-full z-30 p-8 bg-black/95 backdrop-blur-2xl border-b border-neon-cyan/20 shadow-2xl"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Grid2X2 size={18} /> Topic Selection
                  </h3>
                  <TopicSelector
                    currentTopic={topic}
                    onSelect={(t) => { setTopic(t); setShowSettings(false); }}
                  />
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-neon-pink font-bold uppercase tracking-widest mb-6">Difficulty Level</h3>
                    <input
                      type="range"
                      min="1" max="10"
                      value={difficulty}
                      onChange={(e) => setDifficulty(parseInt(e.target.value))}
                      className="w-full accent-neon-pink h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                      <span>Easy</span>
                      <span className="text-neon-pink font-bold text-lg">{difficulty}</span>
                      <span>Hard</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">Close</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 relative z-10">
          <QuestionGrid
            questions={questions}
            showAnswers={showAnswers}
            onToggleAnswers={() => setShowAnswers(!showAnswers)}
            onRefreshQuestion={(index) => {
              const newQs = [...questions];
              newQs[index] = generateQuestion(topic, difficulty);
              setQuestions(newQs);
            }}
          />
        </div>

        <Footer>
          <RosterPicker ref={rosterRef} />
        </Footer>
      </div>

      {/* MISSION OVERLAY */}
      <Mission isOpen={showMission} onClose={() => setShowMission(false)} />
    </main>
  );
}
