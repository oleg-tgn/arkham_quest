import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { loadGameLog, saveGameLog } from './firebase/gameLogService';
import { useGameStore } from './store/useGameStore';

export const GameInitializer = () => {
  const [user] = useAuthState(auth);
  const { gameLog, setGameLog } = useGameStore();

  useEffect(() => {
    if (user) {
      loadGameLog(user.uid).then(savedLog => {
        if (savedLog && savedLog.length > 0) {
          setGameLog(savedLog);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && gameLog.length > 0) {
      saveGameLog(user.uid, gameLog);
    }
  }, [gameLog, user]);

  return null;
};
