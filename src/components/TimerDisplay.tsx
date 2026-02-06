import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { getRandomTimerMessage, getRandomEncouragement } from '@/data/classmates';

interface TimerDisplayProps {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  totalTime: number;
  onStart: (seconds: number) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onPlayClick?: () => void;
  onPlayStart?: () => void;
  onPlayPause?: () => void;
  onPlayResume?: () => void;
}

export const TimerDisplay = ({
  timeLeft,
  isRunning,
  isPaused,
  isFinished,
  totalTime,
  onStart,
  onPause,
  onResume,
  onStop,
  onPlayClick,
  onPlayStart,
  onPlayPause,
  onPlayResume,
}: TimerDisplayProps) => {
  const [customTime, setCustomTime] = useState(180);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");
  const [encouragement, setEncouragement] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 100;

  const getTimerClass = () => {
    if (!isRunning || isPaused) return 'text-foreground';
    if (timeLeft <= 3) return 'timer-danger animate-pulse';
    if (timeLeft <= 10) return 'timer-danger';
    if (timeLeft <= 30) return 'timer-warning';
    return 'timer-safe';
  };

  const handleStart = (secs: number) => {
    setFinishMessage("");
    setEncouragement(getRandomEncouragement());
    onPlayStart?.();
    onStart(secs);
  };

  const handleFinishMessageGenerate = useCallback(() => {
    setFinishMessage(getRandomTimerMessage());
  }, []);

  const speakFinishMessage = useCallback((message: string) => {
    if (!voiceEnabled || !voiceSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled, voiceSupported, selectedVoice]);

  const presetTimes = [
    { label: '1 min', seconds: 60 },
    { label: '2 min', seconds: 120 },
    { label: '3 min', seconds: 180 },
    { label: '5 min', seconds: 300 },
  ];

  useEffect(() => {
    if (isFinished && !finishMessage) {
      handleFinishMessageGenerate();
    }
  }, [isFinished, finishMessage, handleFinishMessageGenerate]);

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setVoiceSupported(supported);

    if (!supported) {
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        return;
      }
      const preferred =
        voices.find((voice) => voice.lang === 'en-US' && /Google|Microsoft|Apple/i.test(voice.name)) ||
        voices.find((voice) => voice.lang === 'en-US') ||
        voices[0];
      setSelectedVoice(preferred || null);
    };

    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
    };
  }, []);

  useEffect(() => {
    if (isFinished && finishMessage) {
      speakFinishMessage(finishMessage);
    }
  }, [finishMessage, isFinished, speakFinishMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 md:p-8 text-center relative overflow-hidden"
    >
      {/* Animated background pulse when running */}
      {isRunning && !isPaused && timeLeft <= 10 && (
        <motion.div
          className="absolute inset-0 bg-destructive/10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* Encouragement message */}
      <AnimatePresence>
        {isRunning && !isPaused && encouragement && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground mb-4"
          >
            {encouragement}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Timer Display */}
      <div className="mb-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft}
            initial={timeLeft <= 10 && isRunning ? { scale: 1.15 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15, type: "spring", stiffness: 500 }}
            className={`timer-display text-6xl md:text-8xl font-bold ${getTimerClass()}`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        
        {/* Finish message with roast */}
        <AnimatePresence>
          {isFinished && finishMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 bg-accent/10 rounded-xl border border-accent/30"
            >
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {finishMessage}
              </p>
              <button
                onClick={() => {
                  onPlayClick?.();
                  const nextMessage = getRandomTimerMessage();
                  setFinishMessage(nextMessage);
                }}
                className="mt-3 text-sm text-accent hover:text-accent/80 underline transition-colors"
              >
                Another roast?
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden mb-6 relative">
        <motion.div
          className={`h-full transition-colors duration-300 ${
            timeLeft <= 10 ? 'bg-destructive' : timeLeft <= 30 ? 'bg-timer-warning' : 'bg-accent'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
        {/* Glow effect for urgency */}
        {isRunning && !isPaused && timeLeft <= 10 && (
          <motion.div
            className="absolute inset-0 bg-destructive/50 blur-sm"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        )}
      </div>

      {/* Controls */}
      {!isRunning && !isFinished ? (
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {presetTimes.map((preset) => (
              <motion.button
                key={preset.seconds}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStart(preset.seconds)}
                className="btn-secondary text-sm"
              >
                {preset.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPlayClick?.();
                setShowCustomInput(!showCustomInput);
              }}
              className="btn-secondary text-sm"
            >
              Custom
            </motion.button>
          </div>

          {/* Custom Time Input */}
          <AnimatePresence>
            {showCustomInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <input
                  type="number"
                  min={10}
                  max={3600}
                  value={customTime}
                  onChange={(e) => setCustomTime(parseInt(e.target.value) || 60)}
                  className="w-24 input-field text-center"
                  placeholder="Seconds"
                />
                <span className="text-sm text-muted-foreground">seconds</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleStart(customTime);
                    setShowCustomInput(false);
                  }}
                  className="btn-primary text-sm"
                >
                  Start
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          {isPaused ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPlayResume?.();
                onResume();
              }}
              className="btn-accent min-w-[110px]"
            >
              Resume
            </motion.button>
          ) : isRunning ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPlayPause?.();
                onPause();
              }}
              className="btn-secondary min-w-[110px]"
            >
              Pause
            </motion.button>
          ) : null}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onPlayClick?.();
              setFinishMessage("");
              onStop();
            }}
            className="btn-secondary min-w-[110px]"
          >
            Stop
          </motion.button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          Voice roast:
        </span>
        <button
          type="button"
          onClick={() => setVoiceEnabled((prev) => !prev)}
          className="px-2 py-1 rounded-full bg-secondary/70 text-foreground transition-colors hover:bg-secondary"
        >
          {voiceEnabled ? 'On' : 'Off'}
        </button>
        {!voiceSupported && (
          <span className="text-xs text-muted-foreground">(Not supported)</span>
        )}
      </div>

      {/* Class info badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-muted-foreground"
      >
        Dakota Collegiate • M10E-2 • E Slot
      </motion.div>
    </motion.div>
  );
};
