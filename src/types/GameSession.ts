import { GameLogEntry } from './GameLogEntry';

export type GameSession = {
  id: string;
  chapterId: string;
  language: string;
  log: GameLogEntry[];
  isFinished: boolean;
  createdAt: number;
  username: string;
  answers: string[];
};
