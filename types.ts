export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  backgroundImage: string;
}

export interface ResultType {
  title: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export type GameState = 'start' | 'playing' | 'finished';