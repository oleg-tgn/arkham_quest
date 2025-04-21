import { Typography } from 'components/Typography';
import { auth } from 'hooks/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { chapters } from 'data/Chapters';
import { LayoutHome } from 'components/LayoutHome';

export const NewGame = () => {
  const navigate = useNavigate();
  const { startNewSession } = useGameStore();
  const [user] = useAuthState(auth);

  const handleStart = (chapterId: string, languageCode: string) => {
    const username = user?.displayName || user?.email || 'Unknown';
    startNewSession(chapterId, languageCode, username);
    navigate('/Investigation');
  };

  return (
    <LayoutHome>
      <NavLink to="/home">Назад</NavLink>
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
    </LayoutHome>
  );
};
