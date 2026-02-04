import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mathTopics, getCategories, getTopicsByCategory } from '@/data/mathTopics';

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
}: TopicSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = useMemo(() => getCategories(), []);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="topic-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Topic {index + 1}</h3>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
          {selectedTopicData?.category || 'Random'}
        </span>
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
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            onPlayClick?.();
          }}
          className="select-field text-left text-sm"
        >
          {selectedTopicData
            ? `${selectedTopicData.category}: ${selectedTopicData.name}`
            : 'Random'}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl max-h-64 overflow-y-auto"
          >
            <button
              onClick={() => {
                onTopicChange('random');
                setIsExpanded(false);
                onPlayClick?.();
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                selectedTopic === 'random' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              Random
            </button>
            
            {Object.entries(groupedTopics).map(([category, topics]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted sticky top-0">
                  {category}
                </div>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onTopicChange(topic.id);
                      setIsExpanded(false);
                      onPlayClick?.();
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      selectedTopic === topic.id ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Difficulty Controls */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Difficulty</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Min:</span>
            <input
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
            <span className="text-xs text-muted-foreground">Max:</span>
            <input
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
    </motion.div>
  );
};
