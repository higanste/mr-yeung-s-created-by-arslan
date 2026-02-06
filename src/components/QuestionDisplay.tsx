import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/questionGenerator';

interface QuestionDisplayProps {
  questions: Question[];
  showAnswers: boolean;
  columns: number;
  fontSize: number;
  onPlayHover?: () => void;
}

export const QuestionDisplay = ({
  questions,
  showAnswers,
  columns,
  fontSize,
  onPlayHover,
}: QuestionDisplayProps) => {
  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl p-12 text-center relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <motion.div 
          className="relative z-10"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-2xl font-semibold text-primary">Q</span>
          </motion.div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            Ready to challenge your brain?
          </h3>
          <p className="text-muted-foreground mb-4">
            Select your topics above and click <span className="text-primary font-semibold">"Create Questions"</span> to start!
          </p>
          <p className="text-sm text-muted-foreground">
            Pro tip: start the timer for an extra challenge.
          </p>
        </motion.div>
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
      className={`grid ${gridCols} gap-4 md:gap-5`}
    >
      <AnimatePresence mode="popLayout">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            whileHover={{ 
              y: -4, 
              boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)",
              transition: { duration: 0.2 }
            }}
            onHoverStart={onPlayHover}
            className="question-item relative overflow-hidden group"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
            
            <div className="relative z-10 flex items-start gap-3">
              <motion.span 
                className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-sm flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {index + 1}
              </motion.span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-foreground font-medium whitespace-pre-line break-words leading-relaxed"
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
                      className="mt-4 pt-4 border-t border-border/50"
                    >
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Answer:
                      </span>
                      <motion.p
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                        className="text-accent font-bold whitespace-pre-line break-words mt-1"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {question.answer}
                      </motion.p>
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
