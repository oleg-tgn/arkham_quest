import React, { createContext, useState, useContext } from 'react';
import GameLog from "../data/GameLog";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState(GameLog);
  const [gameLogScrollPosition, setGameLogScrollPosition] = useState(0);
  const [addressBookFilterText, setAddressBookFilterText] = useState('');

  const value = {
    gameLog,
    setGameLog,
    gameLogScrollPosition,
    setGameLogScrollPosition,
    addressBookFilterText,
    setAddressBookFilterText,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};