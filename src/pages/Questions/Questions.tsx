import { Typography } from 'components/Typography';
import { LayoutInvestigation } from 'components/LayoutInvestigation';
import { useGameStore } from 'store/useGameStore';
import { useNavigate } from 'react-router-dom';

export const Questions = () => {
  const navigate = useNavigate();

  const { finishCurrentSession } = useGameStore();
  const currentSession = useGameStore(state => state.getCurrentSession());

  const handleEndChapter = () => {
    finishCurrentSession();
    navigate('/');
  };

  return (
    <LayoutInvestigation>
      <Typography variant="text">
        <ol>
          <li>Как зовут девушку, упавшую в обморок на улице?</li>
          <li>Как зовут подозрительного человека, сбежавшего с места преступления?</li>
          <li>Как девушка получила ранение?</li>
          <li>Что за опасность поджидает в парке?</li>
          <li>Что украли из музея?</li>
          <li>Как зовут приехавшего в город культиста Шуб-Ниггурат?</li>
          <li>Почему кошка шипела на стену Ист-Салтонстолл-стрит?</li>
          <li>Кого видели работники больницы на верхнем этаже Имперского особняка?</li>
          <li>Чем был занят Баркли Рутгер?</li>
          <li>Кто навещал кладбище поздней ночью?</li>
          <li>Почему этот человек приходил именно ночью и чем он там занимался?</li>
          <li>Какое слово было подписано повсюду в Имперском особняке?</li>
        </ol>
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
