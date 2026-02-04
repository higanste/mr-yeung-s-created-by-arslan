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
  isLoading,
}: ControlPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {/* Question Count */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Questions:
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
        </div>

        {/* Columns */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Columns:
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
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">
            Font Size:
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
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onPlayClick?.();
              onCreateQuestions();
            }}
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Questions
              </>
            )}
          </button>

          <button
            onClick={() => {
              onPlayClick?.();
              onShowAnswersChange(!showAnswers);
            }}
            className={`btn-secondary flex items-center gap-2 ${
              showAnswers ? 'bg-accent/10 text-accent border-accent' : ''
            }`}
          >
            {showAnswers ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                Hide Answers
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Show Answers
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
