import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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
}: TimerDisplayProps) => {
  const [customTime, setCustomTime] = useState(180); // 3 minutes default
  const [showCustomInput, setShowCustomInput] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 100;

  const getTimerClass = () => {
    if (!isRunning || isPaused) return 'text-foreground';
    if (timeLeft <= 10) return 'timer-danger';
    if (timeLeft <= 30) return 'timer-warning';
    return 'timer-safe';
  };

  const presetTimes = [
    { label: '1 min', seconds: 60 },
    { label: '2 min', seconds: 120 },
    { label: '3 min', seconds: 180 },
    { label: '5 min', seconds: 300 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 text-center"
    >
      {/* Timer Display */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft}
            initial={timeLeft <= 10 && isRunning ? { scale: 1.1 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`timer-display text-6xl md:text-7xl font-bold ${getTimerClass()}`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        
        {isFinished && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-semibold mt-2"
          >
            Time's up!
          </motion.p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-6">
        <motion.div
          className={`h-full transition-colors duration-300 ${
            timeLeft <= 10 ? 'bg-destructive' : timeLeft <= 30 ? 'bg-timer-warning' : 'bg-accent'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Controls */}
      {!isRunning && !isFinished ? (
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {presetTimes.map((preset) => (
              <button
                key={preset.seconds}
                onClick={() => {
                  onPlayClick?.();
                  onStart(preset.seconds);
                }}
                className="btn-secondary text-sm"
              >
                {preset.label}
              </button>
            ))}
            <button
              onClick={() => {
                onPlayClick?.();
                setShowCustomInput(!showCustomInput);
              }}
              className="btn-secondary text-sm"
            >
              Custom
            </button>
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
                <button
                  onClick={() => {
                    onPlayClick?.();
                    onStart(customTime);
                    setShowCustomInput(false);
                  }}
                  className="btn-primary text-sm"
                >
                  Start
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          {isPaused ? (
            <button onClick={() => { onPlayClick?.(); onResume(); }} className="btn-accent">
              Resume
            </button>
          ) : (
            <button onClick={() => { onPlayClick?.(); onPause(); }} className="btn-secondary">
              Pause
            </button>
          )}
          <button onClick={() => { onPlayClick?.(); onStop(); }} className="btn-secondary">
            Stop
          </button>
        </div>
      )}
    </motion.div>
  );
};
