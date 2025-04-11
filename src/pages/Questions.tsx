import { FC } from 'react';

export const Questions: FC = () => {
  return (
    <div className="space-y-4">
      <div
        className="bg-arkham-book shadow-lg rounded-lg p-7 font-serif text-gray-800 leading-relaxed h-[calc(100vh-150px)] overflow-y-auto"
      >
        <article className="article list-decimal list-inside space-y-2">
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
        </article>
      </div>
    </div>
  );
};
