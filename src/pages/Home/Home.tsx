import { useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';
import { Typography } from 'components/Typography';
import { LayoutHome } from 'components/LayoutHome';
import { chapters } from 'data/Chapters';
import { Session } from './elements/Session';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'hooks/firebase';

export const Home = () => {
  const navigate = useNavigate();
  const { sessions, startNewSession, selectSession } = useGameStore();
  const [user] = useAuthState(auth);

  const handleStart = (chapterId: string, languageCode: string) => {
    const username = user?.displayName || user?.email || 'Unknown';
    startNewSession(chapterId, languageCode, username);
    navigate('/Investigation');
  };

  const handleContinue = (sessionId: string) => {
    selectSession(sessionId);
    navigate('/Investigation');
  };

  const activeSessions = sessions.filter(session => !session.isFinished);
  const arhivedSessions = sessions.filter(session => session.isFinished);

  return (
    <LayoutHome>
      <Typography variant="heading-1">Новая игра</Typography>
      <div className="mb-8 space-y-2">
        {chapters.map(chapter => (
          <div key={chapter.id} className="space-x-2">
            <button
              className="w-full px-4 py-2 my-2 bg-[#4b3e2c] hover:bg-[#362c1e] text-white text-sm font-bold rounded shadow cursor-pointer"
              onClick={() => handleStart(chapter.id, 'ru')}
            >
              {chapter.title}: {chapter.subtitle}
            </button>
          </div>
        ))}
      </div>

      <Typography variant="heading-1">Продолжить игру</Typography>
      {activeSessions.length === 0 && (
        <p className="text-sm italic text-gray-600">Нет сохранённых расследований</p>
      )}
      <div className="space-y-2">
        {activeSessions.map(session => (
          <Session session={session} handleClick={handleContinue} key={session.id} />
        ))}
      </div>
      <Typography variant="heading-1">Архив</Typography>
      {arhivedSessions.length === 0 && (
        <p className="text-sm italic text-gray-600">Нет сохранённых расследований</p>
      )}

      <div className="space-y-2">
        {arhivedSessions.map(session => (
          <Session session={session} handleClick={handleContinue} key={session.id} />
        ))}
      </div>
    </LayoutHome>
  );
};
