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

  mapTransform: {
    scale: number;
    positionX: number;
    positionY: number;
  };
  setMapTransform: (transform: { scale: number; positionX: number; positionY: number }) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameLog: GameLog,
  setGameLog: (log) => set({ gameLog: log }),

  gameLogScrollPosition: 0,
  setGameLogScrollPosition: (pos) => set({ gameLogScrollPosition: pos }),

  addressBookFilterText: '',
  setAddressBookFilterText: (text) => set({ addressBookFilterText: text }),

  mapTransform: {
    scale: 0.1,
    positionX: 0,
    positionY: 0,
  },
  setMapTransform: (transform) => set({ mapTransform: transform }),
}));
