import { create } from 'zustand';
import { GameLogEntry } from '../types/GameLogEntry';
import { GameLog } from '../data/GameLog';

type GameSession = {
  id: string;
  chapter: string;
  language: string;
  log: GameLogEntry[];
  isFinished: boolean;
  createdAt: number;
};

interface GameState {
  // 🧾 Текущая сессия (прежняя логика)
  gameLog: GameLogEntry[];
  setGameLog: (log: GameLogEntry[]) => void;

  // 🔁 Мультисессии
  sessions: GameSession[];
  currentSessionId: string | null;
  setSessions: (sessions: GameSession[]) => void;
  startNewSession: (chapter: string, language: string) => void;
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
  gameLog: GameLog,
  setGameLog: log => set({ gameLog: log }),

  sessions: [],
  currentSessionId: null,

  setSessions: sessions => set({ sessions }),

  startNewSession: (chapter, language) => {
    const id = crypto.randomUUID();
    const newSession: GameSession = {
      id,
      chapter,
      language,
      isFinished: false,
      createdAt: Date.now(),
      log: [
        {
          id: 0,
          title: 'Начало расследования',
          subtitle: null,
          body: '<i>Вы начинаете своё расследование...</i>',
        },
      ],
    };

    set(state => ({
      sessions: [...state.sessions, newSession],
      currentSessionId: id,
      gameLog: newSession.log, // обновляем старое поле тоже
    }));
  },

  addLogEntry: entry => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId ? { ...session, log: [...session.log, entry] } : session,
    );

    set({ sessions: updatedSessions });
    set({ gameLog: [...get().gameLog, entry] }); // поддержка старого поля
  },

  resetCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId
        ? {
            ...session,
            log: [session.log[0]],
            isFinished: false,
          }
        : session,
    );

    set({ sessions: updatedSessions });
    set({ gameLog: updatedSessions.find(s => s.id === currentSessionId)?.log || [] });
  },

  finishCurrentSession: () => {
    const { sessions, currentSessionId } = get();
    if (!currentSessionId) return;

    const updatedSessions = sessions.map(session =>
      session.id === currentSessionId
        ? {
            ...session,
            isFinished: true,
            log: [
              ...session.log,
              {
                id: session.log.length,
                title: 'Конец игры',
                subtitle: null,
                body: '<i>Вы завершили игру.</i>',
              },
            ],
          }
        : session,
    );

    set({ sessions: updatedSessions });
    set({ gameLog: updatedSessions.find(s => s.id === currentSessionId)?.log || [] });
  },

  selectSession: id => {
    const session = get().sessions.find(s => s.id === id);
    if (session) {
      set({ currentSessionId: id, gameLog: session.log });
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
