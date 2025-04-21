import { create } from 'zustand';
import { GameLogEntry } from '../types/GameLogEntry';

export type GameSession = {
  id: string;
  chapterId: string;
  language: string;
  log: GameLogEntry[];
  isFinished: boolean;
  createdAt: number;
};

interface GameState {
  // 🔁 Мультисессии
  sessions: GameSession[];
  currentSessionId: string | null;
  setSessions: (sessions: GameSession[]) => void;
  startNewSession: (chapterId: string, language: string) => void;
  addLogEntry: (entry: GameLogEntry) => void;
  resetCurrentSession: () => void;
  finishCurrentSession: () => void;
  selectSession: (id: string) => void;
  getCurrentSession: () => GameSession | null;

  // 📜 Прочее (остальное из твоего текущего стора)
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

export const useGameStore = create<GameState>((set, get) => ({
  sessions: [],
  currentSessionId: null,

  setSessions: sessions => set({ sessions }),

  startNewSession: (chapterId: string, language: string) => {
    const id = crypto.randomUUID();
    const newSession: GameSession = {
      id,
      chapterId,
      language,
      isFinished: false,
      createdAt: Date.now(),
      log: [],
    };

    set(state => ({
      sessions: [...state.sessions, newSession],
      currentSessionId: id,
    }));
  },

  addLogEntry: entry => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId ? { ...session, log: [...session.log, entry] } : session,
    );
    console.log('Updated sessions:', updatedSessions);
    set({ sessions: updatedSessions });
  },

  resetCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId
        ? {
            ...session,
            log: [],
            isFinished: false,
          }
        : session,
    );

    set({ sessions: updatedSessions });
  },

  finishCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId
        ? {
            ...session,
            isFinished: true,
            log: [...session.log],
          }
        : session,
    );

    set({ sessions: updatedSessions });
  },

  selectSession: id => {
    const session = get().sessions.find(s => s.id === id);
    if (session) {
      set({ currentSessionId: id });
    }
  },

  getCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    return sessions.find(s => s.id === currentSessionId) || null;
  },

  gameLogScrollPosition: 0,
  setGameLogScrollPosition: pos => set({ gameLogScrollPosition: pos }),

  addressBookFilterText: '',
  setAddressBookFilterText: text => set({ addressBookFilterText: text }),

  mapTransform: {
    scale: 0.1,
    positionX: 0,
    positionY: 0,
  },
  setMapTransform: transform => set({ mapTransform: transform }),
}));
