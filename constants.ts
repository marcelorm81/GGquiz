
import { Question, ResultType } from './types';

// Base URL for raw images
const BASE_IMG_URL = "https://raw.githubusercontent.com/marcelorm81/assets/602a466a47564911ed02ebda0b8d482389db5cb0";

export const INTRO_BG_IMAGE = `${BASE_IMG_URL}/gg.png`;
export const INTRO_BG_VIDEO = "https://raw.githubusercontent.com/marcelorm81/assets/43e3e3161e876d456982b9e8208d32c7512430b1/final_1.mp4";
export const RESULT_BG_MEDIA = "https://customer-jsjst1fdhj7sipkx.cloudflarestream.com/f1f74a5b179801ced08d45878514477f/thumbnails/thumbnail.mp4?&width=1080&duration=14s";

// Available backgrounds to cycle through for the random pool
export const BACKGROUND_POOL = [
  `${BASE_IMG_URL}/gg2.png`,
  `${BASE_IMG_URL}/gg5.png`,
  `${BASE_IMG_URL}/gg6.png`,
  `${BASE_IMG_URL}/gg7.png`,
  `${BASE_IMG_URL}/gg4.png`,
];

// The Fixed First Set
export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which iconic object became the unmistakable symbol of Good Girl from day one?",
    backgroundImage: `${BASE_IMG_URL}/gg2.png`,
    options: [
      { id: 'A', text: "A diamond", isCorrect: false },
      { id: 'B', text: "A stiletto", isCorrect: true },
      { id: 'C', text: "A lipstick", isCorrect: false },
      { id: 'D', text: "A bow", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "Good Girl’s vibe has always been a mix of “good” and “…maybe not that good.” Which line captured this perfectly?",
    backgroundImage: `${BASE_IMG_URL}/gg5.png`,
    options: [
      { id: 'A', text: "“Born to sparkle”", isCorrect: false },
      { id: 'B', text: "“It’s so good to be bad”", isCorrect: true },
      { id: 'C', text: "“Good girls make coffee”", isCorrect: false },
      { id: 'D', text: "“Good girls take notes”", isCorrect: false },
    ],
  },
  {
    id: 3,
    text: "Which ingredient gives Good Girl that instantly recognizable, rich, and slightly addictive edge?",
    backgroundImage: `${BASE_IMG_URL}/gg6.png`,
    options: [
      { id: 'A', text: "Almond", isCorrect: false },
      { id: 'B', text: "Banana", isCorrect: false },
      { id: 'C', text: "Jasmine", isCorrect: true },
      { id: 'D', text: "Sea breeze", isCorrect: false },
    ],
  },
  {
    id: 4,
    text: "Good Girl collectors love the lineup. Which one of these bottles actually exists in the family?",
    backgroundImage: `${BASE_IMG_URL}/gg7.png`,
    options: [
      { id: 'A', text: "The sneaker edition", isCorrect: false },
      { id: 'B', text: "The ballerina pointe shoe", isCorrect: false },
      { id: 'C', text: "The red stiletto", isCorrect: true },
      { id: 'D', text: "The flip-flop edition", isCorrect: false },
    ],
  },
  {
    id: 5,
    text: "If you were describing Good Girl to your best friend using only a vibe, which one matches the original release?",
    backgroundImage: `${BASE_IMG_URL}/gg4.png`,
    options: [
      { id: 'A', text: "“Fresh-out-of-yoga calm”", isCorrect: false },
      { id: 'B', text: "“Midnight-glam energy”", isCorrect: true },
      { id: 'C', text: "“Beach day with friends”", isCorrect: false },
      { id: 'D', text: "“Sunday morning pancakes”", isCorrect: false },
    ],
  },
];

// The Pool for subsequent plays
export const POOL_QUESTIONS: Partial<Question>[] = [
  {
    text: "What year did the original Good Girl launch?",
    options: [
      { id: 'A', text: "2014", isCorrect: false },
      { id: 'B', text: "2016", isCorrect: true },
      { id: 'C', text: "2018", isCorrect: false },
      { id: 'D', text: "2020", isCorrect: false },
    ]
  },
  {
    text: "Which dark, creamy note expresses Good Girl’s mysterious side?",
    options: [
      { id: 'A', text: "Grapefruit", isCorrect: false },
      { id: 'B', text: "Sea salt", isCorrect: false },
      { id: 'C', text: "Pear", isCorrect: false },
      { id: 'D', text: "Tonka bean", isCorrect: true },
    ]
  },
  {
    text: "Good Girl was designed around what idea?",
    options: [
      { id: 'A', text: "Freshness", isCorrect: false },
      { id: 'B', text: "Simplicity", isCorrect: false },
      { id: 'C', text: "Sports energy", isCorrect: false },
      { id: 'D', text: "Duality", isCorrect: true },
    ]
  },
  {
    text: "Which Good Girl edition comes in a red stiletto?",
    options: [
      { id: 'A', text: "Blush", isCorrect: false },
      { id: 'B', text: "Supreme", isCorrect: false },
      { id: 'C', text: "Légère", isCorrect: false },
      { id: 'D', text: "Very Good Girl", isCorrect: true },
    ]
  },
  {
    text: "What does the stiletto bottle represent?",
    options: [
      { id: 'A', text: "Nature", isCorrect: false },
      { id: 'B', text: "Travel", isCorrect: false },
      { id: 'C', text: "Minimalism", isCorrect: false },
      { id: 'D', text: "Power & confidence", isCorrect: true },
    ]
  },
  {
    text: "Which heart note is central to Good Girl’s floral character?",
    options: [
      { id: 'A', text: "Water lily", isCorrect: false },
      { id: 'B', text: "Coconut", isCorrect: false },
      { id: 'C', text: "Peach blossom", isCorrect: false },
      { id: 'D', text: "Tuberose", isCorrect: true },
    ]
  },
  {
    text: "Which ingredient adds warm depth to Good Girl’s base?",
    options: [
      { id: 'A', text: "Pineapple", isCorrect: false },
      { id: 'B', text: "Basil", isCorrect: false },
      { id: 'C', text: "Melon", isCorrect: false },
      { id: 'D', text: "Cocoa", isCorrect: true },
    ]
  },
  {
    text: "Good Girl is best described as:",
    options: [
      { id: 'A', text: "Soft & powdery", isCorrect: false },
      { id: 'B', text: "Crisp & green", isCorrect: false },
      { id: 'C', text: "Sporty & relaxed", isCorrect: false },
      { id: 'D', text: "Seductive & strong", isCorrect: true },
    ]
  },
  {
    text: "Which edition takes Good Girl in a fruity direction?",
    options: [
      { id: 'A', text: "Bowtastic", isCorrect: false },
      { id: 'B', text: "Supreme", isCorrect: false },
      { id: 'C', text: "Midnight", isCorrect: false },
      { id: 'D', text: "Very Good Girl", isCorrect: true },
    ]
  },
  {
    text: "Which Good Girl edition expresses soft, romantic femininity?",
    options: [
      { id: 'A', text: "Dot Drama", isCorrect: false },
      { id: 'B', text: "Supreme", isCorrect: false },
      { id: 'C', text: "Colormania", isCorrect: false },
      { id: 'D', text: "Good Girl Blush", isCorrect: true },
    ]
  },
  {
    text: "Who became the iconic face of Good Girl campaigns?",
    options: [
      { id: 'A', text: "Zendaya", isCorrect: false },
      { id: 'B', text: "Sofia Vergara", isCorrect: false },
      { id: 'C', text: "Gigi Hadid", isCorrect: false },
      { id: 'D', text: "Karlie Kloss", isCorrect: true },
    ]
  },
  {
    text: "Which edition features a deep dark bow on the bottle?",
    options: [
      { id: 'A', text: "Légère", isCorrect: false },
      { id: 'B', text: "Supreme", isCorrect: false },
      { id: 'C', text: "Glam", isCorrect: false },
      { id: 'D', text: "Bowtastic", isCorrect: true },
    ]
  },
  {
    text: "What does jasmine add to Good Girl?",
    options: [
      { id: 'A', text: "Spicy heat", isCorrect: false },
      { id: 'B', text: "Citrus sparkle", isCorrect: false },
      { id: 'C', text: "Smoky woods", isCorrect: false },
      { id: 'D', text: "Bright femininity", isCorrect: true },
    ]
  },
  {
    text: "Good Girl’s bottle was designed to feel like:",
    options: [
      { id: 'A', text: "A travel accessory", isCorrect: false },
      { id: 'B', text: "A lab instrument", isCorrect: false },
      { id: 'C', text: "A sports trophy", isCorrect: false },
      { id: 'D', text: "An object of desire", isCorrect: true },
    ]
  },
  {
    text: "Which edition sends Karlie Kloss on a cosmic mission?",
    options: [
      { id: 'A', text: "Supreme", isCorrect: false },
      { id: 'B', text: "Blush", isCorrect: false },
      { id: 'C', text: "Glam", isCorrect: false },
      { id: 'D', text: "Fantastic Pink", isCorrect: true },
    ]
  },
  {
    text: "Which emotion best describes Good Girl’s personality?",
    options: [
      { id: 'A', text: "Calm & meditative", isCorrect: false },
      { id: 'B', text: "Green & natural", isCorrect: false },
      { id: 'C', text: "Sporty & playful", isCorrect: false },
      { id: 'D', text: "Powerful & provocative", isCorrect: true },
    ]
  },
  {
    text: "Which edition is known for bold, youthful color play?",
    options: [
      { id: 'A', text: "Supreme", isCorrect: false },
      { id: 'B', text: "Légère", isCorrect: false },
      { id: 'C', text: "Glam", isCorrect: false },
      { id: 'D', text: "Colormania", isCorrect: true },
    ]
  },
  {
    text: "Good Girl’s universe is best described as:",
    options: [
      { id: 'A', text: "Rustic and natural", isCorrect: false },
      { id: 'B', text: "Coastal and beachy", isCorrect: false },
      { id: 'C', text: "Fresh and sporty", isCorrect: false },
      { id: 'D', text: "Glamorous, modern, a touch mysterious", isCorrect: true },
    ]
  },
];


export const RESULTS: ResultType[] = [
  {
    minScore: 0,
    maxScore: 1,
    title: "A Rising Good Girl",
    description: "You’re just getting started, which honestly is part of the fun. The Good Girl world is full of glamour, attitude, and little secrets — and now you’re officially on your way. Consider this your first stiletto step into the night.",
  },
  {
    minScore: 2,
    maxScore: 3,
    title: "A Confident Fan",
    description: "You know the bottle, the mood, the energy. You’ve clearly spent time in the Good Girl universe, and it shows. A little more exploring and you’ll be decoding every note like a true insider.",
  },
  {
    minScore: 4,
    maxScore: 5,
    title: "A True Good Girl Devotee",
    description: "You know the stiletto, the scents, the stories — everything. This is elite collector energy. You don’t just wear Good Girl; you understand the world behind it. Midnight-glam confidence is definitely your thing.",
  },
];
