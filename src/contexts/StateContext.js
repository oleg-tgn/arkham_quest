import React, { createContext, useState, useContext } from 'react';
import GameLog from "../data/GameLog";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState(GameLog);
  const [addressBookState, setAddressBookState] = useState({});

  const value = {
    gameLog,
    setGameLog,
    addressBookState,
    setAddressBookState
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};