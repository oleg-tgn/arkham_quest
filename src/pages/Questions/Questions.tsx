import { Typography } from 'components/Typography';
import { LayoutInvestigation } from 'components/LayoutInvestigation';
import { useGameStore } from 'store/useGameStore';
import { useNavigate } from 'react-router-dom';
import { chapters } from 'data/Chapters';
import { Input } from 'components/Input';

export const Questions = () => {
  const navigate = useNavigate();

  const { finishCurrentSession } = useGameStore();
  const currentSession = useGameStore(state => state.getCurrentSession());

  const handleEndChapter = () => {
    finishCurrentSession();
    navigate('/');
  };

  if (!currentSession) return null;

  const currentChapter = chapters.find(c => c.id === currentSession.chapterId);

  return (
    <LayoutInvestigation>
      <Typography variant="text">
        {currentChapter?.questions.map((question, index) => (
          <p key={index}>
            {index + 1}. {question.question}
            <br />
            <Input name={`question-${index}`} />
          </p>
        ))}
      </Typography>

      {!currentSession?.isFinished ? (
        <button
          className="px-4 py-2 bg-[#4b3e2c] hover:bg-[#362c1e] text-white text-sm font-bold rounded shadow"
          onClick={() => handleEndChapter()}
        >
          Завершить главу
        </button>
      ) : (
        <Typography variant="text">
          <i>Расследование завершено.</i>
        </Typography>
      )}
    </LayoutInvestigation>
  );
};
