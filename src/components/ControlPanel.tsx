import { motion } from 'framer-motion';

interface ControlPanelProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showAnswers: boolean;
  onShowAnswersChange: (show: boolean) => void;
  onCreateQuestions: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
  isLoading?: boolean;
}

export const ControlPanel = ({
  questionCount,
  onQuestionCountChange,
  columns,
  onColumnsChange,
  fontSize,
  onFontSizeChange,
  showAnswers,
  onShowAnswersChange,
  onCreateQuestions,
  onPlayClick,
  onPlayHover,
  isLoading,
}: ControlPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl p-4 md:p-6 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {/* Question Count */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          onHoverStart={onPlayHover}
        >
          <label className="text-sm font-medium text-foreground whitespace-nowrap flex items-center gap-1">
            📝 Questions:
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={questionCount}
            onChange={(e) => onQuestionCountChange(parseInt(e.target.value) || 5)}
            onClick={onPlayClick}
            className="w-16 input-field text-center text-sm py-1.5"
          />
        </motion.div>

        {/* Columns */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          onHoverStart={onPlayHover}
        >
          <label className="text-sm font-medium text-foreground whitespace-nowrap flex items-center gap-1">
            📊 Columns:
          </label>
          <select
            value={columns}
            onChange={(e) => {
              onColumnsChange(parseInt(e.target.value));
              onPlayClick?.();
            }}
            className="select-field w-16 text-sm py-1.5"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </motion.div>

        {/* Font Size */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          onHoverStart={onPlayHover}
        >
          <label className="text-sm font-medium text-foreground whitespace-nowrap flex items-center gap-1">
            🔤 Font:
          </label>
          <input
            type="number"
            min={12}
            max={36}
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value) || 18)}
            onClick={onPlayClick}
            className="w-16 input-field text-center text-sm py-1.5"
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onPlayClick?.();
              onCreateQuestions();
            }}
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚙️
                </motion.div>
                Creating...
              </>
            ) : (
              <>
                ✨ Create Questions
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onPlayClick?.();
              onShowAnswersChange(!showAnswers);
            }}
            className={`btn-secondary flex items-center gap-2 ${
              showAnswers ? 'bg-accent/20 text-accent border-accent/50' : ''
            }`}
          >
            {showAnswers ? '🙈 Hide Answers' : '👀 Show Answers'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
