import React, { createContext, useState, useContext, ReactNode } from 'react';
import GameLog from "../data/GameLog";
import { GameLogEntry } from '../types/GameLogEntry';

type StateContextType = {
  gameLog: typeof GameLog;
  setGameLog: React.Dispatch<React.SetStateAction<typeof GameLog>>;
  gameLogScrollPosition: number;
  setGameLogScrollPosition: React.Dispatch<React.SetStateAction<number>>;
  addressBookFilterText: string;
  setAddressBookFilterText: React.Dispatch<React.SetStateAction<string>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
}

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [gameLog, setGameLog] = useState<GameLogEntry[]>(GameLog);
  const [gameLogScrollPosition, setGameLogScrollPosition] = useState(0);
  const [addressBookFilterText, setAddressBookFilterText] = useState('');

  const value: StateContextType = {
    gameLog,
    setGameLog,
    gameLogScrollPosition,
    setGameLogScrollPosition,
    addressBookFilterText,
    setAddressBookFilterText,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};