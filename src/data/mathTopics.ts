export interface MathTopic {
  id: string;
  category: string;
  name: string;
}

export const mathTopics: MathTopic[] = [
  // Arithmetic
  { id: "add-decimals", category: "Arithmetic", name: "Adding decimals" },
  { id: "add-whole", category: "Arithmetic", name: "Adding whole numbers" },
  { id: "div-decimals", category: "Arithmetic", name: "Dividing decimals" },
  { id: "div-whole", category: "Arithmetic", name: "Dividing whole numbers" },
  { id: "mult-decimals", category: "Arithmetic", name: "Multiplying decimals" },
  { id: "mult-whole", category: "Arithmetic", name: "Multiplying whole numbers" },
  { id: "sub-decimals", category: "Arithmetic", name: "Subtracting decimals" },
  { id: "sub-whole", category: "Arithmetic", name: "Subtracting whole numbers" },
  { id: "four-ops-decimals", category: "Arithmetic", name: "Four operations with decimals" },
  { id: "four-ops-whole", category: "Arithmetic", name: "Four operations with whole numbers" },

  // Algebra
  { id: "solve-linear", category: "Equations", name: "Solving one-step equations" },
  { id: "solve-two-step", category: "Equations", name: "Solving two-step equations" },
  { id: "solve-brackets", category: "Equations", name: "Solving with brackets" },
  { id: "solve-both-sides", category: "Equations", name: "Unknowns on both sides" },
  { id: "solve-simultaneous", category: "Equations", name: "Solving simultaneous equations" },
  { id: "solve-quadratic", category: "Equations", name: "Solving quadratics" },

  // Expressions
  { id: "expand-single", category: "Expressions", name: "Expanding single brackets" },
  { id: "expand-double", category: "Expressions", name: "Expanding double brackets" },
  { id: "factorise-single", category: "Expressions", name: "Factorising into single brackets" },
  { id: "factorise-quadratic", category: "Expressions", name: "Factorising quadratics" },
  { id: "collect-like-terms", category: "Expressions", name: "Collecting like terms" },
  { id: "substitution", category: "Expressions", name: "Substitution" },

  // Fractions
  { id: "frac-add", category: "Fractions", name: "Addition" },
  { id: "frac-sub", category: "Fractions", name: "Subtraction" },
  { id: "frac-mult", category: "Fractions", name: "Multiplication" },
  { id: "frac-div", category: "Fractions", name: "Division" },
  { id: "frac-simplify", category: "Fractions", name: "Simplifying" },
  { id: "frac-of-amounts", category: "Fractions", name: "Of amounts" },
  { id: "frac-mixed", category: "Fractions", name: "Mixed numbers" },

  // Percentages
  { id: "perc-of-amounts", category: "Percentages", name: "Of amounts" },
  { id: "perc-increase", category: "Percentages", name: "Increase and decrease" },
  { id: "perc-change", category: "Percentages", name: "Percentage change" },
  { id: "perc-reverse", category: "Percentages", name: "Reverse percentages" },
  { id: "perc-multipliers", category: "Percentages", name: "Multipliers" },

  // Ratio
  { id: "ratio-simplify", category: "Ratio", name: "Simplifying ratios" },
  { id: "ratio-share", category: "Ratio", name: "Sharing in a ratio" },
  { id: "ratio-1n", category: "Ratio", name: "Writing in form 1:n" },

  // Indices
  { id: "indices-mult", category: "Indices", name: "Multiplication law" },
  { id: "indices-div", category: "Indices", name: "Division law" },
  { id: "indices-power", category: "Indices", name: "Power law" },
  { id: "indices-mixed", category: "Indices", name: "Mixed laws" },

  // Sequences
  { id: "seq-next-term", category: "Sequences", name: "Finding the next term" },
  { id: "seq-nth-term", category: "Sequences", name: "Finding nth term" },
  { id: "seq-generate", category: "Sequences", name: "Generating terms" },

  // Geometry
  { id: "pythag-hyp", category: "Pythagoras", name: "Finding the hypotenuse" },
  { id: "pythag-short", category: "Pythagoras", name: "Finding a short side" },
  { id: "trig-angle", category: "Trigonometry", name: "Finding an angle" },
  { id: "trig-length", category: "Trigonometry", name: "Finding a length" },
  { id: "circle-area", category: "Circles", name: "Area of circles" },
  { id: "circle-circum", category: "Circles", name: "Circumference" },

  // Statistics
  { id: "stat-mean", category: "Statistics", name: "Mean" },
  { id: "stat-median", category: "Statistics", name: "Median" },
  { id: "stat-mode", category: "Statistics", name: "Mode" },
  { id: "stat-range", category: "Statistics", name: "Range" },

  // Probability
  { id: "prob-simple", category: "Probability", name: "Simple probability" },
  { id: "prob-expected", category: "Probability", name: "Expected frequency" },

  // Standard Form
  { id: "sf-convert-to", category: "Standard Form", name: "Converting to" },
  { id: "sf-convert-from", category: "Standard Form", name: "Converting from" },
  { id: "sf-mult", category: "Standard Form", name: "Multiplication" },
  { id: "sf-div", category: "Standard Form", name: "Division" },

  // Place Value
  { id: "pv-powers", category: "Place Value", name: "Powers of ten" },
  { id: "pv-order", category: "Place Value", name: "Ordering numbers" },
  { id: "round-dp", category: "Rounding", name: "Decimal places" },
  { id: "round-sf", category: "Rounding", name: "Significant figures" },

  // Directed Numbers
  { id: "neg-add", category: "Negatives", name: "Addition with negatives" },
  { id: "neg-sub", category: "Negatives", name: "Subtraction with negatives" },
  { id: "neg-mult", category: "Negatives", name: "Multiplication with negatives" },
  { id: "neg-div", category: "Negatives", name: "Division with negatives" },

  // FDP
  { id: "fdp-frac", category: "FDP", name: "Converting from fractions" },
  { id: "fdp-dec", category: "FDP", name: "Converting from decimals" },
  { id: "fdp-perc", category: "FDP", name: "Converting from percentages" },

  // Number
  { id: "factors", category: "Number", name: "Factors" },
  { id: "multiples", category: "Number", name: "Multiples" },
  { id: "hcf", category: "Number", name: "Highest Common Factor" },
  { id: "lcm", category: "Number", name: "Lowest Common Multiple" },
  { id: "prime-factors", category: "Number", name: "Prime factorisation" },
  { id: "powers-roots", category: "Number", name: "Powers and roots" },
];

export const getCategories = (): string[] => {
  const categories = new Set(mathTopics.map(t => t.category));
  return Array.from(categories);
};

export const getTopicsByCategory = (category: string): MathTopic[] => {
  return mathTopics.filter(t => t.category === category);
};
