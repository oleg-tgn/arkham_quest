import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { Layout } from '../components/Layout';
import { Typography } from '../components/Typography';

const chapters = [
  { id: 'chapter1', title: 'Глава 1 — Туман над Аркхэмом' },
  { id: 'chapter2', title: 'Глава 2 — Тени прошлого (в разработке)' },
];

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export const SessionSelector = () => {
  const navigate = useNavigate();
  const { sessions, startNewSession, selectSession } = useGameStore();

  const handleStart = (chapterId: string, languageCode: string) => {
    startNewSession(chapterId, languageCode);
    navigate('/');
  };

  const handleContinue = (sessionId: string) => {
    selectSession(sessionId);
    navigate('/');
  };

  return (
    <Layout variant="book" heightClass="h-full overflow-auto">
      <Layout variant="content">
        <Typography variant="heading-1">Новая игра</Typography>
        <div className="mb-8 space-y-2">
          {chapters.map(chapter => (
            <div key={chapter.id} className="space-x-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className="px-4 py-2 bg-[#4b3e2c] hover:bg-[#362c1e] text-white text-sm font-bold rounded shadow"
                  onClick={() => handleStart(chapter.id, lang.code)}
                >
                  {chapter.title} — {lang.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <Typography variant="heading-1">Продолжить игру</Typography>
        {sessions.length === 0 && (
          <p className="text-sm italic text-gray-600">Нет сохранённых сессий</p>
        )}
        <div className="space-y-2">
          {sessions.map(session => (
            <button
              key={session.id}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded text-left text-sm"
              onClick={() => handleContinue(session.id)}
            >
              <strong>
                {chapters.find(c => c.id === session.chapter)?.title || session.chapter}
              </strong>
              <br />
              Язык: {session.language.toUpperCase()} | Строк в логе: {session.log.length}{' '}
              {session.isFinished && '✓'}
            </button>
          ))}
        </div>
      </Layout>
    </Layout>
  );
};
