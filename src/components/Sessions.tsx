import { chapters } from 'data/Chapters';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';

type Props = {
  isFinished?: boolean;
};

export const Sessions = ({ isFinished = false }: Props) => {
  const navigate = useNavigate();
  const { sessions, selectSession } = useGameStore();

  const handleContinue = (sessionId: string) => {
    selectSession(sessionId);
    navigate('/Investigation');
  };

  const currentSessions = sessions.filter(session => session.isFinished === isFinished);

  if (currentSessions.length === 0) {
    return <p className="text-sm italic text-gray-600">Нет сохранённых расследований</p>;
  }

  return (
    <>
      <div className="space-y-2">
        {currentSessions.map(session => {
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
              Записей: {session.log.length} {session.isFinished && '✓'}
            </button>
          );
        })}
      </div>
    </>
  );
};
