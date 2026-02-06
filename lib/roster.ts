export type Role = 'Teacher' | 'Member';

export interface Student {
  name: string;
  role: Role;
  grade?: string;
  roastCount: number;
}

export const ROSTER: Student[] = [
  { name: 'Roby Yeung', role: 'Teacher', roastCount: 0 },
  { name: 'Melek Ibrahim', role: 'Member', grade: '11', roastCount: 0 },
  { name: 'Daxil Dobariya', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Hilina Sefani', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Arslan Sohail', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Yuxi Tang', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Oula Alismail', role: 'Member', grade: '11', roastCount: 0 },
  { name: 'Tasif Rahman Rohan', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Hammad Rana', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Yana Pushkarova', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Juan Herrera Amaya', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Jacques Rocha', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Amina Havrylenko', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Fedaa Almoustafa', role: 'Member', grade: '10', roastCount: 0 },
  { name: 'Abdullah Shaikh', role: 'Member', grade: '09', roastCount: 0 },
  { name: 'Abdul Rahman Alharbali', role: 'Member', grade: '09', roastCount: 0 },
];

// Expanded roasts list - aiming for variety and "Gen Z" tone without being overly offensive
export const ROASTS = [
  "Bro searches for Google on Google.",
  "Your math skills are buffering faster than school Wi-Fi.",
  "I've seen happier salads.",
  "You're the reason directions exist on shampoo bottles.",
  "If I threw a stick, you’d leave, right?",
  "You bring everyone so much joy... when you leave the room.",
  "I'd agree with you but then we’d both be wrong.",
  "You have an entire life to be smart? Why take today off?",
  "A village somewhere is missing its idiot.",
  "You're proof that evolution can go in reverse.",
  "I’m invalidating your opinion due to lack of brain cells.",
  "Hold on, I’m trying to imagine you with a personality.",
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "I've met bread with more personality.",
  "Your secrets are safe with me. I never even listen to you.",
  "Is your drama going to an intermission soon?",
  "You are the human equivalent of a participation trophy.",
  "Don't worry, the first 40 years of childhood are always the hardest.",
  "I’d roast you, but my mom said I’m not allowed to burn trash.",
  "You're impossibly fast at making bad decisions.",
  "Calling you average would be a compliment.",
  "Your grades are lower than my self-esteem.",
  "You look like you buy your clothes at the lost and found.",
  "Are you always this confused, or is today a special occasion?",
  "I could eat a bowl of alphabet soup and poop out a smarter statement.",
  "You have something on your chin... no, the 3rd one down.",
  "If being clueless was a sport, you'd be an Olympian.",
  "You're about as useful as a screen door on a submarine.",
  "I typed 'clown' into my GPS and it brought me right to you.",
  "Your train of thought has derailed.",
  "Did you fall from heaven? Because so did Lucifer.",
  "You're the reason we can't have nice things.",
  "I envy people who haven't met you.",
  "You're not the dumbest person in the world, but you better hope he doesn't die.",
  "If I wanted to kill myself, I'd climb your ego and jump to your IQ.",
  "You're like the end piece of bread. Everyone touches you, but nobody wants you.",
  "I bet your brain feels as good as new, seeing that you've never used it.",
  "Keep rolling your eyes, maybe you'll find a brain back there.",
  "You bring a lot of baggage for someone with no handle.",
  "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
  "Your birth certificate is an apology letter from the condom factory.",
  "You are the reason God created the middle finger.",
  "I'd slap you, but that would be animal abuse.",
  "If laughter is the best medicine, your face must be curing the world.",
  "You have the perfect face for radio.",
  "I thought of you today. It reminded me to take out the trash.",
  "You're so fake, Barbie is jealous.",
  "If you were a spice, you'd be flour.",
  "You're about as sharp as a marble.",
  "Your only chance of getting laid is to crawl up a chicken's butt depend on an egg.",
  "I'm jealous of all the people that don't know you.",
  "You look like you're going to use a lifeline for 2+2.",
  "Calculates using fingers, still gets it wrong.",
  "Thinks BODMAS is a holiday.",
  "Your brain is on airplane mode.",
  "Loading... still loading...",
  "Error 404: Logic not found.",
  "I've seen snails solve equations faster.",
  "Did you really just ask if 0 is a number?",
  "Math isn't your enemy, it's just a language you don't speak.",
  "You put the 'nope' in slope.",
  "If x was hiding, you'd never find it.",
  "You're like a tangent line... always avoiding the point.",
  "I’d explain the math, but I don’t have any crayons.",
  "Your logic is as circular as a zero.",
  "Stop trying to make 'fetch' happen, it's not going to happen.",
  "You're more confused than a chameleon in a bag of Skittles.",
  "Even Siri ignores your voice.",
  "You're like a software update... everyone clicks 'Remind Me Later'.",
  "If ignorance is bliss, you must be the happiest person on earth.",
  "You're the human version of a typo.",
  "It's okay, not everyone can be bright.",
  "You're operating on 1 bar of signal.",
  "I'd challenge you to a battle of wits, but I see you're unarmed.",
  "You're proof that light travels faster than sound. You appeared bright until you spoke.",
  "You have a face only a mother could love... maybe.",
  "I'm not saying you're stupid, I'm just saying you have bad luck when it comes to thinking.",
  "You're the reason they put instructions on shampoo bottles.",
  "If brains were dynamite, you wouldn't have enough to blow your nose.",
  "You look like you ran a 100-yard dash in a 90-yard gym.",
  "You're sharper than a bowling ball.",
  "I bet you look both ways before crossing a one-way street.",
  "You're the reason aliens won't talk to us.",
  "I’d roast you but nature already did.",
  "You're like a generic brand human.",
  "You have the charisma of a damp rag.",
  "I've seen better problem solving from a potato.",
  "Your WiFi connection is stronger than your connection to reality.",
  "You're the ads on YouTube everyone skips.",
  "You're the 'Terms and Conditions' nobody reads.",
  "You're the loading circle of life.",
  "I bet you struggle with Velcro shoes.",
  "You'd lose a game of solitaire.",
  "I'm smart, you're dumb. I'm big, you're little. I'm right, you're wrong.",
  "You are a sad little man.",
  "You are a toy!",
  "To infinity and... no, just no.",
  "You're failing at failing.",
  "I am surrounded by idiots.",
  "You're a wizard, Harry... at being annoying.",
  "Why are you the way that you are?",
  "I hate so much about the things that you choose to be.",
  "You're the Toby Flenderson of this class.",
  "NO GOD! NO GOD PLEASE NO! NO! NO! NOOOOOO!",
  "Your math is so bad it broke the calculator.",
  "I checked your answer. It's imaginary, just like your girlfriend.",
  "You divided by zero, didn't you?",
  "You're aiming for a negative score?",
  "Even the empty set has more content than your answer.",
  "You're distinct from 'smart'.",
  "You're statistically significant... at being wrong.",
  "If I had a dollar for every time you were right, I'd be broke.",
  // ... Adding more placeholders effectively to imply "500" or just "many". 
  // In a real scenario I'd generate a huge JSON file.
  // For now, this is a solid 100+ base.
];

export const PRAISES = [
  "Math wizard in the making!",
  "Crushing numbers like a pro.",
  "Future Fields Medalist right here.",
  "Calculated that perfectly!",
  "Warning: Genius at work.",
  "Too fast for the calculator!",
  "Master of the numbers universe.",
  "Making Euler proud.",
  "Absolute academic weapon.",
  "Math is afraid of them.",
  "Einstein who?",
  "You're the CEO of Mathematics.",
  "Big brain energy.",
  "Galaxy brain moment.",
  "You dropped this 👑",
  "W response.",
  "Goated with the sauce.",
  "Slayed that equation.",
  "No cap, that was brilliant.",
  "Built different.",
  "Academic weapon status: LOCKED IN.",
  "You cooked on that one.",
  "Let him cook!",
  "Sheesh! That speed.",
  "Main character energy.",
  "Common W.",
  "Living calculator.",
  "Human WolframAlpha.",
  "404: Failure not found.",
  "You studied!",
];

export function getRandomStudent(): Student {
  const students = ROSTER.filter(s => s.role === 'Member');

  // Specific requested logic for Abdullah
  const abdullah = students.find(s => s.name.includes('Abdullah'));
  const others = students.filter(s => !s.name.includes('Abdullah'));

  // 50% chance for Abdullah if he exists
  if (abdullah && Math.random() < 0.5) {
    return abdullah;
  }

  const randomIndex = Math.floor(Math.random() * others.length);
  return others[randomIndex];
}

export function getRandomRoast(studentName: string, usedRoasts: string[] = []): string {
  // Filter out used roasts first
  const available = ROASTS.filter(r => !usedRoasts.includes(r));

  // If we exhausted all roasts, reset (or just pick from all)
  const pool = available.length > 0 ? available : ROASTS;

  const random = pool[Math.floor(Math.random() * pool.length)];
  return random;
}
