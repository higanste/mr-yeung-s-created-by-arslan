import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mathTopics, getCategories } from '@/data/mathTopics';

interface TopicSelectorProps {
  index: number;
  selectedTopic: string;
  onTopicChange: (topicId: string) => void;
  minDifficulty: number;
  maxDifficulty: number;
  onMinDifficultyChange: (value: number) => void;
  onMaxDifficultyChange: (value: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const TopicSelector = ({
  index,
  selectedTopic,
  onTopicChange,
  minDifficulty,
  maxDifficulty,
  onMinDifficultyChange,
  onMaxDifficultyChange,
  searchQuery,
  onSearchChange,
  onPlayClick,
  onPlayHover,
}: TopicSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return mathTopics;
    const query = searchQuery.toLowerCase();
    return mathTopics.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedTopics = useMemo(() => {
    const groups: Record<string, typeof mathTopics> = {};
    filteredTopics.forEach((topic) => {
      if (!groups[topic.category]) {
        groups[topic.category] = [];
      }
      groups[topic.category].push(topic);
    });
    return groups;
  }, [filteredTopics]);

  const selectedTopicData = mathTopics.find((t) => t.id === selectedTopic);

  const topicColors = [
    'from-blue-500/20 to-cyan-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-orange-500/20 to-yellow-500/20',
    'from-green-500/20 to-emerald-500/20',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={onPlayHover}
      className={`topic-card relative overflow-hidden bg-gradient-to-br ${topicColors[index]}`}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {index + 1}
            </span>
            Topic {index + 1}
          </h3>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary/80 rounded-full font-medium"
          >
            {selectedTopicData?.category || 'Random'}
          </motion.span>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClick={onPlayClick}
            className="input-field text-sm"
          />
        </div>

        {/* Topic Dropdown */}
        <div className="relative mb-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsExpanded(!isExpanded);
              onPlayClick?.();
            }}
            className="select-field text-left text-sm w-full"
          >
            {selectedTopicData
              ? `${selectedTopicData.category}: ${selectedTopicData.name}`
              : 'Random'}
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl max-h-64 overflow-y-auto"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                  onClick={() => {
                    onTopicChange('random');
                    setIsExpanded(false);
                    onPlayClick?.();
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedTopic === 'random' ? 'bg-primary/10 text-primary font-medium' : ''
                  }`}
                >
                  Random
                </motion.button>
                
                {Object.entries(groupedTopics).map(([category, topics]) => (
                  <div key={category}>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0 backdrop-blur-sm">
                      {category}
                    </div>
                    {topics.map((topic) => (
                      <motion.button
                        key={topic.id}
                        whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                        onClick={() => {
                          onTopicChange(topic.id);
                          setIsExpanded(false);
                          onPlayClick?.();
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedTopic === topic.id ? 'bg-primary/10 text-primary font-medium' : ''
                        }`}
                      >
                        {topic.name}
                      </motion.button>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Difficulty Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Difficulty
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Min:</span>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                min={1}
                max={10}
                value={minDifficulty}
                onChange={(e) => onMinDifficultyChange(parseInt(e.target.value) || 1)}
                onClick={onPlayClick}
                className="w-14 input-field text-center text-sm py-1.5"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Max:</span>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                min={1}
                max={10}
                value={maxDifficulty}
                onChange={(e) => onMaxDifficultyChange(parseInt(e.target.value) || 1)}
                onClick={onPlayClick}
                className="w-14 input-field text-center text-sm py-1.5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
