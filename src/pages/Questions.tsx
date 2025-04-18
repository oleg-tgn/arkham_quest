import { Typography } from '../components/Typography';
import { Layout } from '../components/Layout';

export const Questions = () => {
  return (
    <Layout variant="book" heightClass="h-full">
      <Layout variant="content">
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
      </Layout>
    </Layout>
  );
};
