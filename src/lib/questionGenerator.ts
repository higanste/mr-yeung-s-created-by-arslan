export interface Question {
  id: string;
  question: string;
  answer: string;
  topicId: string;
}

// Random number between min and max (inclusive)
const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Format decimal to remove trailing zeros
const formatNum = (n: number): string => {
  return parseFloat(n.toFixed(2)).toString();
};

// Generate a random decimal based on difficulty
const randDecimal = (difficulty: number): number => {
  const places = Math.min(difficulty, 3);
  const multiplier = Math.pow(10, places);
  const max = difficulty * 10;
  return Math.round(Math.random() * max * multiplier) / multiplier;
};

// Question generators by topic ID
const generators: Record<string, (difficulty: number) => { q: string; a: string }> = {
  // Arithmetic
  "add-decimals": (d) => {
    const a = randDecimal(d);
    const b = randDecimal(d);
    return { q: `${formatNum(a)} + ${formatNum(b)}`, a: formatNum(a + b) };
  },
  "add-whole": (d) => {
    const max = d * 100;
    const a = randInt(1, max);
    const b = randInt(1, max);
    return { q: `${a} + ${b}`, a: `${a + b}` };
  },
  "sub-decimals": (d) => {
    const a = randDecimal(d) + 10;
    const b = randDecimal(d);
    return { q: `${formatNum(a)} − ${formatNum(b)}`, a: formatNum(a - b) };
  },
  "sub-whole": (d) => {
    const max = d * 100;
    const a = randInt(50, max + 50);
    const b = randInt(1, 50);
    return { q: `${a} − ${b}`, a: `${a - b}` };
  },
  "mult-decimals": (d) => {
    const a = randDecimal(Math.min(d, 2));
    const b = randInt(2, 10);
    return { q: `${formatNum(a)} × ${b}`, a: formatNum(a * b) };
  },
  "mult-whole": (d) => {
    const a = randInt(2, d * 12);
    const b = randInt(2, 12);
    return { q: `${a} × ${b}`, a: `${a * b}` };
  },
  "div-decimals": (d) => {
    const divisor = randInt(2, 10);
    const result = randDecimal(Math.min(d, 2));
    const dividend = result * divisor;
    return { q: `${formatNum(dividend)} ÷ ${divisor}`, a: formatNum(result) };
  },
  "div-whole": (d) => {
    const divisor = randInt(2, 12);
    const result = randInt(2, d * 10);
    const dividend = result * divisor;
    return { q: `${dividend} ÷ ${divisor}`, a: `${result}` };
  },
  "four-ops-decimals": (d) => {
    const ops = ['+', '−', '×', '÷'];
    const op = ops[randInt(0, 3)];
    const gen = generators[op === '+' ? 'add-decimals' : op === '−' ? 'sub-decimals' : op === '×' ? 'mult-decimals' : 'div-decimals'];
    return gen(d);
  },
  "four-ops-whole": (d) => {
    const ops = ['+', '−', '×', '÷'];
    const op = ops[randInt(0, 3)];
    const gen = generators[op === '+' ? 'add-whole' : op === '−' ? 'sub-whole' : op === '×' ? 'mult-whole' : 'div-whole'];
    return gen(d);
  },

  // Equations
  "solve-linear": (d) => {
    const x = randInt(1, d * 5);
    const a = randInt(2, 10);
    const result = a * x;
    return { q: `${a}x = ${result}`, a: `x = ${x}` };
  },
  "solve-two-step": (d) => {
    const x = randInt(1, d * 3);
    const a = randInt(2, 8);
    const b = randInt(1, 10);
    const result = a * x + b;
    return { q: `${a}x + ${b} = ${result}`, a: `x = ${x}` };
  },
  "solve-brackets": (d) => {
    const x = randInt(1, d * 2);
    const a = randInt(2, 5);
    const b = randInt(1, 5);
    const result = a * (x + b);
    return { q: `${a}(x + ${b}) = ${result}`, a: `x = ${x}` };
  },
  "solve-both-sides": (d) => {
    const x = randInt(1, d * 3);
    const a = randInt(3, 8);
    const b = randInt(1, a - 1);
    const c = (a - b) * x;
    return { q: `${a}x = ${b}x + ${c}`, a: `x = ${x}` };
  },
  "solve-simultaneous": (d) => {
    const x = randInt(1, 5);
    const y = randInt(1, 5);
    const a = randInt(1, 3);
    const b = randInt(1, 3);
    const c = a * x + b * y;
    const e = randInt(1, 3);
    const f = e * x - y;
    return { q: `${a}x + ${b}y = ${c}\n${e}x − y = ${f}`, a: `x = ${x}, y = ${y}` };
  },
  "solve-quadratic": (d) => {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    return { q: `x² − ${a + b}x + ${a * b} = 0`, a: `x = ${a} or x = ${b}` };
  },

  // Expressions
  "expand-single": (d) => {
    const a = randInt(2, d * 3);
    const b = randInt(1, 10);
    return { q: `Expand: ${a}(x + ${b})`, a: `${a}x + ${a * b}` };
  },
  "expand-double": (d) => {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    return { q: `Expand: (x + ${a})(x + ${b})`, a: `x² + ${a + b}x + ${a * b}` };
  },
  "factorise-single": (d) => {
    const a = randInt(2, 6);
    const b = randInt(1, 10);
    return { q: `Factorise: ${a}x + ${a * b}`, a: `${a}(x + ${b})` };
  },
  "factorise-quadratic": (d) => {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    return { q: `Factorise: x² + ${a + b}x + ${a * b}`, a: `(x + ${a})(x + ${b})` };
  },
  "collect-like-terms": (d) => {
    const a = randInt(1, d * 3);
    const b = randInt(1, d * 3);
    const c = randInt(1, d * 2);
    const e = randInt(1, d * 2);
    return { q: `Simplify: ${a}x + ${c}y + ${b}x + ${e}y`, a: `${a + b}x + ${c + e}y` };
  },
  "substitution": (d) => {
    const x = randInt(1, d * 2);
    const a = randInt(2, 5);
    const b = randInt(1, 10);
    return { q: `If x = ${x}, find ${a}x + ${b}`, a: `${a * x + b}` };
  },

  // Fractions
  "frac-add": (d) => {
    const denom = [2, 3, 4, 5, 6, 8, 10][randInt(0, 6)];
    const a = randInt(1, denom - 1);
    const b = randInt(1, denom - 1);
    const sum = a + b;
    if (sum >= denom) {
      const whole = Math.floor(sum / denom);
      const rem = sum % denom;
      return { q: `${a}/${denom} + ${b}/${denom}`, a: rem === 0 ? `${whole}` : `${whole} ${rem}/${denom}` };
    }
    return { q: `${a}/${denom} + ${b}/${denom}`, a: `${sum}/${denom}` };
  },
  "frac-sub": (d) => {
    const denom = [2, 3, 4, 5, 6, 8, 10][randInt(0, 6)];
    const a = randInt(2, denom - 1);
    const b = randInt(1, a - 1);
    return { q: `${a}/${denom} − ${b}/${denom}`, a: `${a - b}/${denom}` };
  },
  "frac-mult": (d) => {
    const a = randInt(1, 5);
    const b = randInt(2, 6);
    const c = randInt(1, 5);
    const e = randInt(2, 6);
    return { q: `${a}/${b} × ${c}/${e}`, a: `${a * c}/${b * e}` };
  },
  "frac-div": (d) => {
    const a = randInt(1, 5);
    const b = randInt(2, 6);
    const c = randInt(1, 5);
    const e = randInt(2, 6);
    return { q: `${a}/${b} ÷ ${c}/${e}`, a: `${a * e}/${b * c}` };
  },
  "frac-simplify": (d) => {
    const factor = randInt(2, 6);
    const a = randInt(1, 6);
    const b = randInt(a + 1, 12);
    return { q: `Simplify: ${a * factor}/${b * factor}`, a: `${a}/${b}` };
  },
  "frac-of-amounts": (d) => {
    const denom = [2, 3, 4, 5, 10][randInt(0, 4)];
    const num = randInt(1, denom - 1);
    const amount = denom * randInt(2, d * 5);
    return { q: `Find ${num}/${denom} of ${amount}`, a: `${(num / denom) * amount}` };
  },
  "frac-mixed": (d) => {
    const whole = randInt(1, 5);
    const num = randInt(1, 4);
    const denom = randInt(num + 1, 8);
    const improper = whole * denom + num;
    return { q: `Convert ${whole} ${num}/${denom} to improper fraction`, a: `${improper}/${denom}` };
  },

  // Percentages
  "perc-of-amounts": (d) => {
    const percs = [10, 20, 25, 50, 5, 15, 30, 40, 75];
    const perc = percs[randInt(0, Math.min(d + 2, 8))];
    const amount = randInt(10, d * 100);
    return { q: `Find ${perc}% of ${amount}`, a: `${(perc / 100) * amount}` };
  },
  "perc-increase": (d) => {
    const amount = randInt(50, d * 100);
    const perc = [10, 20, 25, 50][randInt(0, 3)];
    const result = amount * (1 + perc / 100);
    return { q: `Increase ${amount} by ${perc}%`, a: `${result}` };
  },
  "perc-change": (d) => {
    const original = randInt(20, 100);
    const change = randInt(5, 30);
    const newVal = original + change;
    const percChange = ((change / original) * 100).toFixed(1);
    return { q: `${original} → ${newVal}\nFind % increase`, a: `${percChange}%` };
  },
  "perc-reverse": (d) => {
    const original = randInt(50, 200);
    const perc = [10, 20, 25, 50][randInt(0, 3)];
    const after = original * (1 + perc / 100);
    return { q: `After ${perc}% increase: ${after}\nFind original`, a: `${original}` };
  },
  "perc-multipliers": (d) => {
    const perc = randInt(1, 50);
    const isIncrease = Math.random() > 0.5;
    const mult = isIncrease ? 1 + perc / 100 : 1 - perc / 100;
    return { q: `${isIncrease ? 'Increase' : 'Decrease'} by ${perc}%\nMultiplier?`, a: `${mult.toFixed(2)}` };
  },

  // Ratio
  "ratio-simplify": (d) => {
    const factor = randInt(2, 6);
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    return { q: `Simplify: ${a * factor} : ${b * factor}`, a: `${a} : ${b}` };
  },
  "ratio-share": (d) => {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    const total = (a + b) * randInt(2, d * 5);
    const partA = (total / (a + b)) * a;
    const partB = (total / (a + b)) * b;
    return { q: `Share ${total} in ratio ${a}:${b}`, a: `${partA} and ${partB}` };
  },
  "ratio-1n": (d) => {
    const a = randInt(2, 10);
    const b = randInt(a + 1, 20);
    const ratio = (b / a).toFixed(2);
    return { q: `Write ${a}:${b} in form 1:n`, a: `1:${ratio}` };
  },

  // Indices
  "indices-mult": (d) => {
    const a = randInt(2, d + 2);
    const b = randInt(2, d + 2);
    return { q: `Simplify: x^${a} × x^${b}`, a: `x^${a + b}` };
  },
  "indices-div": (d) => {
    const b = randInt(2, d + 2);
    const a = b + randInt(1, d + 2);
    return { q: `Simplify: x^${a} ÷ x^${b}`, a: `x^${a - b}` };
  },
  "indices-power": (d) => {
    const a = randInt(2, 4);
    const b = randInt(2, 4);
    return { q: `Simplify: (x^${a})^${b}`, a: `x^${a * b}` };
  },
  "indices-mixed": (d) => {
    const a = randInt(2, 5);
    const b = randInt(2, 5);
    const c = randInt(2, 4);
    return { q: `Simplify: x^${a} × x^${b} ÷ x^${c}`, a: `x^${a + b - c}` };
  },

  // Sequences
  "seq-next-term": (d) => {
    const start = randInt(1, 10);
    const diff = randInt(2, d * 3);
    const terms = [start, start + diff, start + 2 * diff, start + 3 * diff];
    return { q: `${terms.join(', ')}, ...`, a: `${start + 4 * diff}` };
  },
  "seq-nth-term": (d) => {
    const a = randInt(2, d * 2);
    const b = randInt(-5, 10);
    const terms = [a + b, 2 * a + b, 3 * a + b, 4 * a + b];
    const bSign = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
    return { q: `Find nth term:\n${terms.join(', ')}, ...`, a: `${a}n ${bSign}` };
  },
  "seq-generate": (d) => {
    const a = randInt(2, 5);
    const b = randInt(1, 10);
    const n = randInt(5, 10);
    return { q: `nth term = ${a}n + ${b}\nFind ${n}th term`, a: `${a * n + b}` };
  },

  // Geometry
  "pythag-hyp": (d) => {
    const pairs = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15]];
    const [a, b, c] = pairs[randInt(0, Math.min(d, 4))];
    return { q: `Right triangle: a=${a}, b=${b}\nFind hypotenuse`, a: `${c}` };
  },
  "pythag-short": (d) => {
    const pairs = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]];
    const [a, b, c] = pairs[randInt(0, Math.min(d, 3))];
    return { q: `Right triangle: a=${a}, c=${c}\nFind b`, a: `${b}` };
  },
  "trig-angle": (d) => {
    const angles = [30, 45, 60];
    const angle = angles[randInt(0, 2)];
    return { q: `sin(x) = ${Math.sin(angle * Math.PI / 180).toFixed(3)}\nFind x`, a: `${angle}°` };
  },
  "trig-length": (d) => {
    const angle = [30, 45, 60][randInt(0, 2)];
    const hyp = randInt(5, 15);
    const opp = (hyp * Math.sin(angle * Math.PI / 180)).toFixed(1);
    return { q: `Hyp=${hyp}, angle=${angle}°\nFind opposite`, a: `${opp}` };
  },
  "circle-area": (d) => {
    const r = randInt(2, d * 3);
    const area = (Math.PI * r * r).toFixed(2);
    return { q: `Circle radius = ${r}\nFind area (to 2dp)`, a: `${area}` };
  },
  "circle-circum": (d) => {
    const r = randInt(2, d * 3);
    const circum = (2 * Math.PI * r).toFixed(2);
    return { q: `Circle radius = ${r}\nFind circumference (to 2dp)`, a: `${circum}` };
  },

  // Statistics
  "stat-mean": (d) => {
    const count = randInt(3, 5);
    const nums = Array.from({ length: count }, () => randInt(1, d * 10));
    const mean = (nums.reduce((a, b) => a + b, 0) / count).toFixed(1);
    return { q: `Find mean:\n${nums.join(', ')}`, a: `${mean}` };
  },
  "stat-median": (d) => {
    const count = 5;
    const nums = Array.from({ length: count }, () => randInt(1, d * 10)).sort((a, b) => a - b);
    return { q: `Find median:\n${nums.join(', ')}`, a: `${nums[2]}` };
  },
  "stat-mode": (d) => {
    const mode = randInt(1, 10);
    const nums = [mode, mode, randInt(1, 10), randInt(1, 10), mode].sort((a, b) => a - b);
    return { q: `Find mode:\n${nums.join(', ')}`, a: `${mode}` };
  },
  "stat-range": (d) => {
    const nums = Array.from({ length: 5 }, () => randInt(1, d * 10)).sort((a, b) => a - b);
    return { q: `Find range:\n${nums.join(', ')}`, a: `${nums[4] - nums[0]}` };
  },

  // Probability
  "prob-simple": (d) => {
    const total = [6, 8, 10, 12][randInt(0, 3)];
    const favourable = randInt(1, total - 1);
    return { q: `${favourable} out of ${total} balls are red.\nP(red)?`, a: `${favourable}/${total}` };
  },
  "prob-expected": (d) => {
    const prob = [0.1, 0.2, 0.25, 0.5][randInt(0, 3)];
    const trials = randInt(20, 100);
    return { q: `P(win) = ${prob}\nTrials = ${trials}\nExpected wins?`, a: `${prob * trials}` };
  },

  // Standard Form
  "sf-convert-to": (d) => {
    const mantissa = randInt(1, 9) + randInt(1, 9) / 10;
    const exp = randInt(2, d + 3);
    const num = mantissa * Math.pow(10, exp);
    return { q: `Write in standard form:\n${num}`, a: `${mantissa} × 10^${exp}` };
  },
  "sf-convert-from": (d) => {
    const mantissa = randInt(1, 9) + randInt(1, 9) / 10;
    const exp = randInt(2, 5);
    const result = mantissa * Math.pow(10, exp);
    return { q: `${mantissa} × 10^${exp}`, a: `${result}` };
  },
  "sf-mult": (d) => {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const e1 = randInt(2, 5);
    const e2 = randInt(2, 5);
    return { q: `(${a} × 10^${e1}) × (${b} × 10^${e2})`, a: `${a * b} × 10^${e1 + e2}` };
  },
  "sf-div": (d) => {
    const a = randInt(4, 9);
    const b = randInt(2, 4);
    const e1 = randInt(4, 8);
    const e2 = randInt(2, e1 - 1);
    return { q: `(${a * b} × 10^${e1}) ÷ (${b} × 10^${e2})`, a: `${a} × 10^${e1 - e2}` };
  },

  // Place Value
  "pv-powers": (d) => {
    const num = randDecimal(2) + randInt(1, 10);
    const power = randInt(1, 3);
    const mult = Math.pow(10, power);
    return { q: `${formatNum(num)} × ${mult}`, a: formatNum(num * mult) };
  },
  "pv-order": (d) => {
    const nums = Array.from({ length: 4 }, () => randDecimal(2) + randInt(0, 5));
    const sorted = [...nums].sort((a, b) => a - b).map(formatNum).join(', ');
    return { q: `Order smallest to largest:\n${nums.map(formatNum).join(', ')}`, a: sorted };
  },
  "round-dp": (d) => {
    const num = randInt(1, 100) + Math.random();
    const dp = randInt(1, 2);
    return { q: `Round ${num.toFixed(4)} to ${dp}dp`, a: num.toFixed(dp) };
  },
  "round-sf": (d) => {
    const num = randInt(100, 9999) + Math.random();
    const sf = randInt(2, 3);
    const multiplier = Math.pow(10, Math.floor(Math.log10(num)) - sf + 1);
    const rounded = Math.round(num / multiplier) * multiplier;
    return { q: `Round ${num.toFixed(2)} to ${sf} s.f.`, a: `${rounded}` };
  },

  // Negatives
  "neg-add": (d) => {
    const a = randInt(-10, 10);
    const b = randInt(-10, 10);
    return { q: `${a} + ${b < 0 ? `(${b})` : b}`, a: `${a + b}` };
  },
  "neg-sub": (d) => {
    const a = randInt(-10, 10);
    const b = randInt(-10, 10);
    return { q: `${a} − ${b < 0 ? `(${b})` : b}`, a: `${a - b}` };
  },
  "neg-mult": (d) => {
    const a = randInt(-10, 10);
    const b = randInt(-10, 10);
    return { q: `${a < 0 ? `(${a})` : a} × ${b < 0 ? `(${b})` : b}`, a: `${a * b}` };
  },
  "neg-div": (d) => {
    const b = randInt(1, 10) * (Math.random() > 0.5 ? 1 : -1);
    const result = randInt(1, 10) * (Math.random() > 0.5 ? 1 : -1);
    const a = b * result;
    return { q: `${a < 0 ? `(${a})` : a} ÷ ${b < 0 ? `(${b})` : b}`, a: `${result}` };
  },

  // FDP
  "fdp-frac": (d) => {
    const fracs: [number, number, string, string][] = [
      [1, 2, "0.5", "50%"],
      [1, 4, "0.25", "25%"],
      [3, 4, "0.75", "75%"],
      [1, 5, "0.2", "20%"],
      [2, 5, "0.4", "40%"],
    ];
    const [num, denom, dec, perc] = fracs[randInt(0, 4)];
    return { q: `Convert ${num}/${denom} to decimal and %`, a: `${dec} and ${perc}` };
  },
  "fdp-dec": (d) => {
    const decs: [string, string, string][] = [
      ["0.5", "1/2", "50%"],
      ["0.25", "1/4", "25%"],
      ["0.75", "3/4", "75%"],
      ["0.2", "1/5", "20%"],
      ["0.1", "1/10", "10%"],
    ];
    const [dec, frac, perc] = decs[randInt(0, 4)];
    return { q: `Convert ${dec} to fraction and %`, a: `${frac} and ${perc}` };
  },
  "fdp-perc": (d) => {
    const percs: [string, string, string][] = [
      ["50%", "1/2", "0.5"],
      ["25%", "1/4", "0.25"],
      ["75%", "3/4", "0.75"],
      ["20%", "1/5", "0.2"],
      ["10%", "1/10", "0.1"],
    ];
    const [perc, frac, dec] = percs[randInt(0, 4)];
    return { q: `Convert ${perc} to fraction and decimal`, a: `${frac} and ${dec}` };
  },

  // Number
  "factors": (d) => {
    const nums = [12, 18, 24, 30, 36, 48, 60];
    const n = nums[randInt(0, Math.min(d, 6))];
    const facts: number[] = [];
    for (let i = 1; i <= n; i++) if (n % i === 0) facts.push(i);
    return { q: `List factors of ${n}`, a: facts.join(', ') };
  },
  "multiples": (d) => {
    const n = randInt(3, 9);
    const mults = Array.from({ length: 5 }, (_, i) => n * (i + 1));
    return { q: `First 5 multiples of ${n}`, a: mults.join(', ') };
  },
  "hcf": (d) => {
    const pairs: [number, number, number][] = [[12, 18, 6], [24, 36, 12], [20, 30, 10], [15, 25, 5]];
    const [a, b, hcf] = pairs[randInt(0, 3)];
    return { q: `HCF of ${a} and ${b}`, a: `${hcf}` };
  },
  "lcm": (d) => {
    const pairs: [number, number, number][] = [[4, 6, 12], [3, 5, 15], [6, 8, 24], [4, 10, 20]];
    const [a, b, lcm] = pairs[randInt(0, 3)];
    return { q: `LCM of ${a} and ${b}`, a: `${lcm}` };
  },
  "prime-factors": (d) => {
    const nums: [number, string][] = [[12, "2² × 3"], [18, "2 × 3²"], [24, "2³ × 3"], [36, "2² × 3²"], [60, "2² × 3 × 5"]];
    const [n, pf] = nums[randInt(0, Math.min(d, 4))];
    return { q: `Express ${n} as product of primes`, a: pf };
  },
  "powers-roots": (d) => {
    const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
    const n = squares[randInt(0, Math.min(d + 3, 10))];
    return { q: `√${n}`, a: `${Math.sqrt(n)}` };
  },
};

// Fallback generator for missing topics
const fallbackGenerator = (topicId: string, difficulty: number): { q: string; a: string } => {
  const a = randInt(1, difficulty * 10);
  const b = randInt(1, difficulty * 5);
  return { q: `${a} + ${b}`, a: `${a + b}` };
};

export const generateQuestion = (topicId: string, difficulty: number): Question => {
  const generator = generators[topicId] || (() => fallbackGenerator(topicId, difficulty));
  const { q, a } = generator(difficulty);
  
  return {
    id: crypto.randomUUID(),
    question: q,
    answer: a,
    topicId,
  };
};

export const generateQuestions = (
  topicId: string,
  count: number,
  minDifficulty: number,
  maxDifficulty: number
): Question[] => {
  return Array.from({ length: count }, () => {
    const difficulty = randInt(minDifficulty, maxDifficulty);
    return generateQuestion(topicId, difficulty);
  });
};
