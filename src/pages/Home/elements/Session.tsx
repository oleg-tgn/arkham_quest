import { chapters } from 'data/Chapters';
import { GameSession } from 'store/useGameStore';

type Props = {
  session: GameSession;
  handleClick: (sessionId: string) => void;
};

export const Session = ({ session, handleClick }: Props) => {
  const chapter = chapters.find(c => c.id === session.chapterId);

  return (
    <button
      key={session.id}
      className="w-full px-4 py-2 hover:bg-gray-200/20 border rounded text-left text-sm cursor-pointer"
      onClick={() => handleClick(session.id)}
    >
      <strong>{chapter?.title || 'Неизвестная глава'}</strong> — {session.language.toUpperCase()}
      <br />
      Записей: {session.log.length} {session.isFinished && '✓'}
    </button>
  );
};
