import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { db } from './firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useGameStore } from 'store/useGameStore';
import { GameSession } from 'types/GameSession';

export const useFirebaseGameSync = () => {
  const [user] = useAuthState(auth);
  const { sessions, setSessions } = useGameStore();

  // 🔄 Загрузка всех сессий пользователя
  useEffect(() => {
    if (!user) return;

    console.log('Loading sessions for user:', user.uid);

    const load = async () => {
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');
      const snap = await getDocs(sessionsRef);

      const loadedSessions: GameSession[] = [];
      snap.forEach(doc => {
        loadedSessions.push(doc.data() as GameSession);
      });

      setSessions(loadedSessions);
    };

    load();
  }, [user, setSessions]);

  // 💾 Автосохранение всех сессий при изменении
  useEffect(() => {
    if (!user) return;

    const save = async () => {
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');

      await Promise.all(sessions.map(session => setDoc(doc(sessionsRef, session.id), session)));
    };

    save();
  }, [user, sessions]);
};
