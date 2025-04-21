import { Typography } from 'components/Typography';
import { auth } from 'hooks/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGameStore } from 'store/useGameStore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { chapters } from 'data/Chapters';
import { LayoutHome } from 'components/LayoutHome';
import { Button } from 'components/Button';

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
            <Button variant="story" onClick={() => handleStart(chapter.id, 'ru')}>
              {chapter.title}: {chapter.subtitle}
            </Button>
          </div>
        ))}
      </div>
    </LayoutHome>
  );
};
