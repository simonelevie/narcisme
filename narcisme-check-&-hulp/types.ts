export interface Question {
  id: number;
  text: string;
}

export enum QuizState {
  INTRO = 'INTRO',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface QuizResult {
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high' | 'severe';
  title: string;
  description: string;
}