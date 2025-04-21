import { chapters } from 'data/Chapters';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';
import { Button } from 'components/Button';

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
            <Button key={session.id} variant="story" onClick={() => handleContinue(session.id)}>
              {chapter?.title}: {chapter?.subtitle} [{session.language.toUpperCase()}]
              <br />
              Записей: {session.log.length}
              {session.isFinished && '✓'}
            </Button>
          );
        })}
      </div>
    </>
  );
};
