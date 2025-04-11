import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { GameLogEntry } from "../types/GameLogEntry";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { loadGameLog, saveGameLog } from "../firebase/gameLogService";
import { GameLog } from "../data/GameLog"; 

interface StateContextType {
  gameLog: GameLogEntry[];
  setGameLog: React.Dispatch<React.SetStateAction<GameLogEntry[]>>;
  gameLogScrollPosition: number;
  setGameLogScrollPosition: React.Dispatch<React.SetStateAction<number>>;
  addressBookFilterText: string;
  setAddressBookFilterText: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameLog, setGameLog] = useState<GameLogEntry[]>(GameLog);
  const [gameLogScrollPosition, setGameLogScrollPosition] = useState(0);
  const [addressBookFilterText, setAddressBookFilterText] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      loadGameLog(user.uid).then((savedLog) => {
        console.log("🔥 Loaded game log:", savedLog);
        if (savedLog && savedLog.length > 0) {
          setGameLog(savedLog);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && gameLog.length > 0) {
      saveGameLog(user.uid, gameLog);
      console.log("Saving gameLog for user", user.uid, gameLog);
    }
  }, [gameLog, user]);

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

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
