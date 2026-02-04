import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/questionGenerator';

interface QuestionDisplayProps {
  questions: Question[];
  showAnswers: boolean;
  columns: number;
  fontSize: number;
}

export const QuestionDisplay = ({
  questions,
  showAnswers,
  columns,
  fontSize,
}: QuestionDisplayProps) => {
  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl p-12 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Questions Generated
        </h3>
        <p className="text-muted-foreground">
          Select your topics and click "Create Questions" to get started
        </p>
      </motion.div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid ${gridCols} gap-4`}
    >
      <AnimatePresence mode="popLayout">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="question-item"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-foreground font-medium whitespace-pre-line break-words"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {question.question}
                </p>
                
                <AnimatePresence>
                  {showAnswers && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Answer:
                      </span>
                      <p
                        className="text-accent font-semibold whitespace-pre-line break-words"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {question.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
