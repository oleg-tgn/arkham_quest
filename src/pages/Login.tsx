import GoogleAuth from '../components/GoogleAuth';
import { Layout } from '../components/Layout';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { LayoutHome } from '../components/LayoutHome';
import { Typography } from '../components/Typography';

export const Login = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout variant="book" heightClass="h-full">
        <Layout variant="content">
          <p>Загрузка...</p>
        </Layout>
      </Layout>
    );
  }

  return (
    <LayoutHome>
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
          <ul className="list-disc list-inside ml-4">
            <li>React + TypeScript (основа проекта)</li>
            <li>Tailwind CSS (стилизация)</li>
            <li>Firebase (аутентификация, хранение игровой истории)</li>
            <li>Vite (сборка)</li>
          </ul>
        </p>

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

        <p>Чтобы начать игру вам нужно войти в систему используя ваш аккаунт Google.</p>
      </Typography>
      <GoogleAuth />
    </LayoutHome>
  );
};
