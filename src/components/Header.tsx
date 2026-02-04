import { motion } from 'framer-motion';

interface HeaderProps {
  onOpenSettings?: () => void;
  onPlayHover?: () => void;
}

export const Header = ({ onOpenSettings, onPlayHover }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          onHoverStart={onPlayHover}
        >
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-foreground font-bold text-2xl">π</span>
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Mr. Yeung's Math Challenge
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                🏫 Dakota Collegiate
              </span>
              <span className="text-border">•</span>
              <span>M10E-2</span>
              <span className="text-border">•</span>
              <span>E Slot</span>
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span 
            className="hidden md:block text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            DCI-25/26 📚
          </motion.span>
        </motion.div>
      </div>
    </motion.header>
  );
};
