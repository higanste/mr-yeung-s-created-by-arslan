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

// Get a random classmate (excluding the creator Arslan and the teacher)
export const getRandomStudent = (): Classmate => {
  const students = classmates.filter(c => !c.isTeacher && c.firstName !== "Arslan");
  return students[Math.floor(Math.random() * students.length)];
};

// Funny roast messages for when timer ends
export const timerEndMessages = [
  (name: string) => `⏰ TIME'S UP! ${name}, pencils down! No more thinking! 🧠💨`,
  (name: string) => `🚨 TIMES UP! Hey ${name}, did you actually finish or just stare at the paper? 👀`,
  (name: string) => `⏱️ DONE! ${name} is probably still on question 1... classic 😂`,
  (name: string) => `🔔 TIME'S OVER! ${name}, stop writing! Mr. Yeung is watching! 👁️`,
  (name: string) => `⚡ FINISHED! ${name} better have some answers ready! 📝`,
  (name: string) => `🎯 TIME UP! ${name}, hope you didn't just draw doodles the whole time! 🎨`,
  (name: string) => `💥 BOOM! Time's done! ${name}, let's see what you got! 💪`,
  (name: string) => `🏁 THAT'S IT! ${name}, no more "just one more second" excuses! ⏳`,
  (name: string) => `⭐ TIME! ${name}, time to show Mr. Yeung what you're made of! 🌟`,
  (name: string) => `🔥 DONE! ${name}, hope your brain didn't overheat! 🧠🔥`,
  (name: string) => `📢 ATTENTION! Time's up! ${name}, stop pretending to calculate! 🤓`,
  (name: string) => `🎪 IT'S OVER! ${name} probably wrote their name really fancy at least! ✨`,
  (name: string) => `⚠️ TIME! ${name}, remember: guessing is a valid strategy! 🎲`,
  (name: string) => `🌈 COMPLETE! ${name}, math is just spicy counting anyway! 🌶️`,
  (name: string) => `🚀 FINISHED! ${name}, to the moon with those answers! 🌙`,
];

// Get a random timer end message with a random student name
export const getRandomTimerMessage = (): string => {
  const student = getRandomStudent();
  const messageFunc = timerEndMessages[Math.floor(Math.random() * timerEndMessages.length)];
  return messageFunc(student.firstName);
};

// Encouraging messages that appear randomly
export const encouragingMessages = [
  "You got this, Dakota Collegiate! 💪",
  "M10E-2 is the best class! 🏆",
  "Mr. Yeung believes in you! 📚",
  "Math is just organized thinking! 🧠",
  "Focus mode: ACTIVATED 🎯",
  "Grade 9 squad represent! 🔥",
  "Dakota Collegiate excellence! ⭐",
];

export const getRandomEncouragement = (): string => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};
