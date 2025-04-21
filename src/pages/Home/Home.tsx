import { useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';
import { Typography } from 'components/Typography';
import { LayoutHome } from 'components/LayoutHome';
import { chapters } from 'data/Chapters';

export const Home = () => {
  const navigate = useNavigate();
  const { sessions, startNewSession, selectSession } = useGameStore();

  const handleStart = (chapterId: string, languageCode: string) => {
    startNewSession(chapterId, languageCode);
    navigate('/Investigation');
  };

  const handleContinue = (sessionId: string) => {
    selectSession(sessionId);
    navigate('/Investigation');
  };

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
      {sessions.length === 0 && (
        <p className="text-sm italic text-gray-600">Нет сохранённых сессий</p>
      )}
      <div className="space-y-2">
        {sessions.map(session => {
          const chapter = chapters.find(c => c.id === session.chapterId);

          return (
            <button
              key={session.id}
              className="w-full px-4 py-2 hover:bg-gray-200/20 border rounded text-left text-sm cursor-pointer"
              onClick={() => handleContinue(session.id)}
            >
              <strong>{chapter?.title || 'Неизвестная глава'}</strong> —{' '}
              {session.language.toUpperCase()}
              <br />
              <br />
              Записей: {session.log.length} {session.isFinished && '✓'}
            </button>
          );
        })}
      </div>
    </LayoutHome>
  );
};
