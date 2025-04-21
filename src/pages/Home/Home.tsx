import { useNavigate } from 'react-router-dom';
import { LayoutHome } from 'components/LayoutHome';
import { Button } from 'components/Button';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <LayoutHome>
      <div className="h-full flex flex-col items-center pt-20">
        <Button variant="primary" onClick={() => navigate('/newGame')}>
          Новая Игра
        </Button>
        <Button variant="primary" onClick={() => navigate('/continue')}>
          Продолжить Игру
        </Button>
        <Button variant="primary" onClick={() => navigate('/archive')}>
          Архив
        </Button>
        <Button variant="primary" onClick={() => navigate('/about')}>
          О проекте
        </Button>
      </div>
    </LayoutHome>
  );
};
