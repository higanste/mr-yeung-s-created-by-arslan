import { Topic } from './topics';

export interface Question {
    id: string;
    question: string;
    answer: string;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateQuestion(topicId: string, difficulty: number): Question {
    let q = '';
    let a = '';

    // Scale difficulty
    // Diff 1: 1-10
    // Diff 5: 1-50
    // Diff 10: 1-100+
    const maxVal = difficulty * 12;

    switch (topicId) {
        case 'addition': {
            const x = randomInt(2, maxVal);
            const y = randomInt(2, maxVal);
            q = `${x} + ${y}`;
            a = (x + y).toString();
            break;
        }
        case 'subtraction': {
            const x = randomInt(5, maxVal + 10);
            const y = randomInt(2, x); // ensure positive result
            q = `${x} - ${y}`;
            a = (x - y).toString();
            break;
        }
        case 'multiplication': {
            const x = randomInt(2, Math.max(12, difficulty * 3));
            const y = randomInt(2, Math.max(12, difficulty * 3));
            q = `${x} × ${y}`;
            a = (x * y).toString();
            break;
        }
        case 'division': {
            const y = randomInt(2, Math.max(12, difficulty * 2)); // divisor
            const ans = randomInt(2, Math.max(12, difficulty * 2));
            const x = y * ans; // dividend
            q = `${x} ÷ ${y}`;
            a = ans.toString();
            break;
        }
        case 'solve_linear': {
            // x + a = b  or ax + b = c
            if (difficulty < 5) {
                const val = randomInt(1, 15);
                const add = randomInt(1, 20);
                // x + add = (val + add)
                q = `x + ${add} = ${val + add}`;
                a = `x = ${val}`;
            } else {
                const xVal = randomInt(2, 12);
                const coeff = randomInt(2, 10);
                const constant = randomInt(1, 20);
                // coeff*x + constant = result
                const result = coeff * xVal + constant;
                q = `${coeff}x + ${constant} = ${result}`;
                a = `x = ${xVal}`;
            }
            break;
        }
        case 'expand_brackets': {
            const out = randomInt(2, 10);
            const insideX = difficulty > 5 ? randomInt(2, 5) : 1;
            const insideConst = randomInt(1, 12);
            // out(insideX x + insideConst)
            const term1 = out * insideX;
            const term2 = out * insideConst;
            q = `${out}(${insideX > 1 ? insideX : ''}x + ${insideConst})`;
            a = `${term1}x + ${term2}`;
            break;
        }
        case 'angles_triangle': {
            const angle1 = randomInt(20, 100);
            const angle2 = randomInt(20, 170 - angle1);
            const angle3 = 180 - angle1 - angle2;
            q = `Triangle angles: ${angle1}°, ${angle2}°, x°`;
            a = `x = ${angle3}`;
            break;
        }
        // Default fallback
        default: {
            const x = randomInt(1, 10);
            const y = randomInt(1, 10);
            q = `${x} + ${y}`;
            a = (x + y).toString();
        }
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        question: q,
        answer: a,
    };
}

export function generateQuestions(topicId: string, count: number, difficulty: number): Question[] {
    return Array.from({ length: count }).map(() => generateQuestion(topicId, difficulty));
}
