import React, {
  createContext,
  useContext,
  useState,
 // useEffect,
  ReactNode,
} from "react";
import { GameLogEntry } from "../types/GameLogEntry";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase";
// import { loadGameLog, saveGameLog } from "../firebase/gameLogService";
import GameLog from "../data/GameLog"; // твоя начальная история
// import { doc, setDoc } from "firebase/firestore";

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
  //const [user] = useAuthState(auth);

  // Загрузка истории расследования после авторизации
  // useEffect(() => {
  //   if (user) {
  //     loadGameLog(user.uid).then((savedLog) => {
  //       if (savedLog && savedLog.length > 0) {
  //         setGameLog(savedLog);
  //       }
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     console.log("✅ User is authorized:", user.uid);
  //     console.log("🔥 Firebase currentUser:", auth.currentUser);

  
  //     const ref = doc(db, "users", user.uid);
  //     setDoc(ref, { test: "hello" })
  //       .then(() => console.log("✅ Firestore write success"))
  //       .catch((err) => console.error("❌ Firestore write failed", err));
  //   } else {
  //     console.log("⏳ Waiting for user...");
  //   }
  // }, [user]);

  // Сохранение в Firebase при каждом изменении
  // useEffect(() => {
  //   if (user && gameLog.length > 0) {
  //     saveGameLog(user.uid, gameLog);
  //     console.log("Saving gameLog for user", user.uid, gameLog);
  //   }
  // }, [gameLog, user]);

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
