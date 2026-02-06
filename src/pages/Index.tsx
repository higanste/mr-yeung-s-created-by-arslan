import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { TopicSelector } from '@/components/TopicSelector';
import { ControlPanel } from '@/components/ControlPanel';
import { TimerDisplay } from '@/components/TimerDisplay';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { Footer } from '@/components/Footer';
import { useTimer } from '@/hooks/useTimer';
import { useBeepSound } from '@/hooks/useSound';
import { generateQuestions, Question } from '@/lib/questionGenerator';
import { mathTopics } from '@/data/mathTopics';

interface TopicConfig {
  topicId: string;
  minDifficulty: number;
  maxDifficulty: number;
  searchQuery: string;
}

const defaultTopicConfig: TopicConfig = {
  topicId: 'random',
  minDifficulty: 1,
  maxDifficulty: 5,
  searchQuery: '',
};

const Index = () => {
  // Topic configurations for 4 topic panels
  const [topicConfigs, setTopicConfigs] = useState<TopicConfig[]>([
    { ...defaultTopicConfig },
    { ...defaultTopicConfig },
    { ...defaultTopicConfig },
    { ...defaultTopicConfig },
  ]);

  // Question settings
  const [questionCount, setQuestionCount] = useState(5);
  const [columns, setColumns] = useState(2);
  const [fontSize, setFontSize] = useState(18);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Timer
  const [totalTime, setTotalTime] = useState(180);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Sound effects
  const { 
    playCountdownBeep, 
    playFinishSound, 
    playClickSound, 
    playSuccessSound,
    playHoverSound,
    playStartSound,
    playPauseSound,
    playResumeSound,
  } = useBeepSound();

  const handleTimerTick = useCallback((timeLeft: number) => {
    playCountdownBeep(timeLeft);
  }, [playCountdownBeep]);

  const handleTimerFinish = useCallback(() => {
    playFinishSound();
  }, [playFinishSound]);

  const timer = useTimer(handleTimerTick, handleTimerFinish);

  const handleStartTimer = useCallback((seconds: number) => {
    setTotalTime(seconds);
    timer.start(seconds);
  }, [timer]);

  const handleToggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      return;
    }

    await document.exitFullscreen();
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Update topic config
  const updateTopicConfig = (index: number, updates: Partial<TopicConfig>) => {
    setTopicConfigs((prev) => {
      const newConfigs = [...prev];
      newConfigs[index] = { ...newConfigs[index], ...updates };
      return newConfigs;
    });
  };

  // Generate questions from selected topics
  const handleCreateQuestions = useCallback(() => {
    setIsLoading(true);
    playSuccessSound();

    // Simulate slight delay for better UX
    setTimeout(() => {
      const allQuestions: Question[] = [];
      const questionsPerTopic = Math.ceil(questionCount / 4);

      topicConfigs.forEach((config) => {
        let topicId = config.topicId;
        
        // If random, pick a random topic
        if (topicId === 'random') {
          const randomIndex = Math.floor(Math.random() * mathTopics.length);
          topicId = mathTopics[randomIndex].id;
        }

        const topicQuestions = generateQuestions(
          topicId,
          questionsPerTopic,
          config.minDifficulty,
          config.maxDifficulty
        );
        allQuestions.push(...topicQuestions);
      });

      // Shuffle and limit to requested count
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, questionCount));
      setIsLoading(false);
    }, 300);
  }, [topicConfigs, questionCount, playSuccessSound]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/8 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Extra floating orb */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <Header
          onPlayHover={playHoverSound}
          onToggleFullscreen={handleToggleFullscreen}
          isFullscreen={isFullscreen}
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 pb-8 pt-2 md:pt-4">
          {/* Control Panel */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ControlPanel
              questionCount={questionCount}
              onQuestionCountChange={setQuestionCount}
              columns={columns}
              onColumnsChange={setColumns}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              showAnswers={showAnswers}
              onShowAnswersChange={setShowAnswers}
              onCreateQuestions={handleCreateQuestions}
              onPlayClick={playClickSound}
              onPlayHover={playHoverSound}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Topic Selectors Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {topicConfigs.map((config, index) => (
              <TopicSelector
                key={index}
                index={index}
                selectedTopic={config.topicId}
                onTopicChange={(topicId) => updateTopicConfig(index, { topicId })}
                minDifficulty={config.minDifficulty}
                maxDifficulty={config.maxDifficulty}
                onMinDifficultyChange={(min) => updateTopicConfig(index, { minDifficulty: min })}
                onMaxDifficultyChange={(max) => updateTopicConfig(index, { maxDifficulty: max })}
                searchQuery={config.searchQuery}
                onSearchChange={(query) => updateTopicConfig(index, { searchQuery: query })}
                onPlayClick={playClickSound}
                onPlayHover={playHoverSound}
              />
            ))}
          </motion.div>

          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <TimerDisplay
              timeLeft={timer.timeLeft}
              isRunning={timer.isRunning}
              isPaused={timer.isPaused}
              isFinished={timer.isFinished}
              totalTime={totalTime}
              onStart={handleStartTimer}
              onPause={timer.pause}
              onResume={timer.resume}
              onStop={timer.stop}
              onPlayClick={playClickSound}
              onPlayStart={playStartSound}
              onPlayPause={playPauseSound}
              onPlayResume={playResumeSound}
            />
          </motion.div>

          {/* Questions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <QuestionDisplay
              questions={questions}
              showAnswers={showAnswers}
              columns={columns}
              fontSize={fontSize}
              onPlayHover={playHoverSound}
            />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
