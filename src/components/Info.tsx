import { Typography } from './Typography';

export const Info = () => {
  return (
    <>
      <Typography variant="text">
        <p>
          <strong>«Тайны Аркхема»</strong> — это пет-проект, созданный по мотивам одноимённой
          настольной игры, основанной на произведениях Говарда Лавкрафта. Действие разворачивается в
          США, в городе Аркхэм, штат Массачусетс, в 1920-х годах. Проект стремится перенести
          атмосферу и механику оригинала в цифровой формат.
        </p>
        <p>
          Игра реализована в виде одностраничного веб-приложения (SPA) с использованием современных
          технологий:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>React + TypeScript (основа проекта)</li>
          <li>Tailwind CSS (стилизация)</li>
          <li>Firebase (аутентификация, хранение игровой истории)</li>
          <li>Vite (сборка)</li>
        </ul>

        <p>
          Проект разработан в свободное время и распространяется бесплатно как open-source. Исходный
          код доступен на
          <a
            href="https://github.com/oleg-tgn/arkham_quest"
            className="text-[#8b5e3c] underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          Автор проекта —
          <a
            href="https://www.linkedin.com/in/stelmakholegdev/"
            className="text-[#8b5e3c] underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Олег Стельмах
          </a>
          .
        </p>
      </Typography>
    </>
  );
};
