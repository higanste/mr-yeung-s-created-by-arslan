export interface Classmate {
  name: string;
  firstName: string;
  grade: number;
  isTeacher?: boolean;
}

export const classmates: Classmate[] = [
  { name: "Roby Yeung", firstName: "Mr. Yeung", grade: 0, isTeacher: true },
  { name: "Melek Ibrahim", firstName: "Melek", grade: 11 },
  { name: "Daxil Dobariya", firstName: "Daxil", grade: 9 },
  { name: "Hilina Sefani", firstName: "Hilina", grade: 9 },
  { name: "Arslan Sohail", firstName: "Arslan", grade: 9 },
  { name: "Yuxi Tang", firstName: "Yuxi", grade: 9 },
  { name: "Oula Alismail", firstName: "Oula", grade: 11 },
  { name: "Tasif Rahman Rohan", firstName: "Tasif", grade: 9 },
  { name: "Hammad Rana", firstName: "Hammad", grade: 9 },
  { name: "Yana Pushkarova", firstName: "Yana", grade: 9 },
  { name: "Juan Herrera Amaya", firstName: "Juan", grade: 9 },
  { name: "Jacques Rocha", firstName: "Jacques", grade: 9 },
  { name: "Amina Havrylenko", firstName: "Amina", grade: 9 },
  { name: "Fedaa Almoustafa", firstName: "Fedaa", grade: 10 },
  { name: "Abdullah Shaikh", firstName: "Abdullah", grade: 9 },
  { name: "Abdul Rahman Alharbali", firstName: "Abdul Rahman", grade: 9 },
];

// Get a random classmate (excluding the teacher)
export const getRandomStudent = (): Classmate => {
  const students = classmates.filter(c => !c.isTeacher);
  return students[Math.floor(Math.random() * students.length)];
};

const roastOpeners = [
  "Time is up",
  "Timer finished",
  "Clock stopped",
  "Final bell",
  "Time is over",
  "Pencils down",
  "Submission time",
  "That's the buzzer",
  "End of round",
  "No more time",
];

const roastSetups = [
  "did you actually finish or just stare at the paper",
  "is still on question one",
  "is about to negotiate for five more seconds",
  "made the bold choice to rewrite the question instead of solving it",
  "is hoping effort marks can carry today",
  "just discovered that math is not a spectator sport",
  "turned the margin into a doodle museum",
  "is about to speed-run the last page",
  "used the calculator as emotional support",
  "is looking for the hidden bonus question",
  "spent more time on the title than the answers",
  "is about to claim a last-second breakthrough",
  "is trying to solve it with vibes",
  "is practicing their dramatic sigh",
  "is about to ask if this will be on the test",
  "is writing a love letter to the quadratic formula",
  "is inventing new numbers to make it work",
  "is still deciding which pencil to trust",
  "is sure the answer is 42",
  "is fighting for partial credit",
];

const roastEnders = [
  "show us what you got",
  "that was ambitious",
  "respect the confidence",
  "bold strategy",
  "classic move",
  "legendary effort",
  "speed mode next time",
  "time to turn in",
  "no extra credit for vibes",
  "Mr. Yeung is watching",
  "grade 9 energy",
  "all eyes on the paper",
  "make it count",
  "wrap it up",
  "final answer",
];

export const timerEndMessages = roastOpeners.flatMap((opener) =>
  roastSetups.flatMap((setup) =>
    roastEnders.map((ender) => (name: string) => `${opener}, ${name}. ${setup}. ${ender}.`)
  )
);

// Get a random timer end message with a random student name
export const getRandomTimerMessage = (): string => {
  const student = getRandomStudent();
  const messageFunc = timerEndMessages[Math.floor(Math.random() * timerEndMessages.length)];
  return messageFunc(student.firstName);
};

// Encouraging messages that appear randomly
export const encouragingMessages = [
  "You have this, Dakota Collegiate.",
  "M10E-2 is focused.",
  "Mr. Yeung believes in you.",
  "Math is organized thinking.",
  "Focus mode activated.",
  "Grade 9 squad energy.",
  "Dakota Collegiate excellence.",
];

export const getRandomEncouragement = (): string => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};
