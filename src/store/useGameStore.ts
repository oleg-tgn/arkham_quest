import { create } from 'zustand';
import { GameLogEntry } from '../types/GameLogEntry';
import { GameLog } from '../data/GameLog';

interface GameState {
  gameLog: GameLogEntry[];
  setGameLog: (log: GameLogEntry[]) => void;

  gameLogScrollPosition: number;
  setGameLogScrollPosition: (pos: number) => void;

  addressBookFilterText: string;
  setAddressBookFilterText: (text: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameLog: GameLog,
  setGameLog: (log) => set({ gameLog: log }),

  gameLogScrollPosition: 0,
  setGameLogScrollPosition: (pos) => set({ gameLogScrollPosition: pos }),

  addressBookFilterText: '',
  setAddressBookFilterText: (text) => set({ addressBookFilterText: text }),
}));
