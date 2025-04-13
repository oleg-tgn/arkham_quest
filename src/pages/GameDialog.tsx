import { useRef, useEffect, FormEvent } from 'react';
import { QuestLocations } from '../data/QuestLocations';
import { GameLogEntry } from '../types/GameLogEntry';
import { useGameStore } from '../store/useGameStore';
import { Typography } from '../components/Typography';
import { Layout } from '../components/Layout';

export const GameDialog = () => {
  const inputDistrict = useRef<HTMLSelectElement>(null);
  const inputNumber = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

  // Zustand state
  const gameLog = useGameStore(state => state.gameLog);
  const setGameLog = useGameStore(state => state.setGameLog);

  function handleNewLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const district = inputDistrict.current?.value || '';
    const number = inputNumber.current?.value || '';

    if (!district || !number) return;

    const value = district + number;

    if (/[^а-яА-Я0-9\s]/.test(value)) {
      alert('Пожалуйста, используйте русскую раскладку');
      return;
    }

    const newId = gameLog[gameLog.length - 1].id + 1;
    const nextLocation = QuestLocations[value];

    if (nextLocation) {
      if (gameLog[gameLog.length - 1].code === value) {
        alert('Вы уже находитесь в этой локации');
        return;
      }

      const newEntry: GameLogEntry = {
        ...nextLocation,
        id: newId,
        title: null,
        subtitle: value,
        code: value,
      };
      setGameLog([...gameLog, newEntry]);
    } else {
      const errorEntry: GameLogEntry = {
        id: newId,
        title: null,
        subtitle: null,
        body: `<i>В локации ${value} вы не нашли никаких зацепок.</i>`,
      };
      setGameLog([...gameLog, errorEntry]);
    }
  }

  useEffect(() => {
    if (logTextRef.current && gameLog.length > 1) {
      logTextRef.current.scrollTop = logTextRef.current.scrollHeight;
    }
  }, [gameLog.length]);

  return (
    <>
      <Layout variant="book" heightClass="h-full" ref={logTextRef}>
        <Layout variant="content">
          {gameLog.map(log => (
            <div key={log.id} className="mb-6">
              {log.title ? <Typography variant="heading-1">{log.title}</Typography> : null}
              {log.subtitle ? <Typography variant="heading-2">{log.subtitle}</Typography> : null}
              <Typography variant="text">
                <article dangerouslySetInnerHTML={{ __html: log.body }} />
              </Typography>
            </div>
          ))}
        </Layout>
      </Layout>

      <Layout variant="book" heightClass="h-[80px]">
        <form onSubmit={handleNewLocation} className="h-full">
          <Layout variant="form">
            <label className="text-sm font-semibold text-gray-700" htmlFor="district">
              Локация:
            </label>
            <select
              ref={inputDistrict}
              id="district"
              className="p-2 border border-gray-500 rounded text-sm flex-1 min-w-[100px]"
            >
              <option value="">Выберите</option>
              <option value="А">А — Аптаун</option>
              <option value="Д">Д — Даунтаун</option>
              <option value="И">И — Исттаун</option>
              <option value="Н">Н — Нортсайд</option>
              <option value="Р">Р — Ривертаун</option>
              <option value="С">С — Саутсайд</option>
              <option value="Т">Т — Торговый район</option>
              <option value="У">У — Университет</option>
              <option value="Ф">Ф — Френч-хилл</option>
            </select>

            <label className="text-sm font-semibold text-gray-700" htmlFor="location">
              Код:
            </label>
            <input
              type="number"
              min="1"
              max="100"
              id="location"
              ref={inputNumber}
              className="p-2 border border-gray-500 rounded text-sm w-20"
              placeholder="№"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#6b3f22] text-white text-sm font-bold rounded shadow whitespace-nowrap"
            >
              Перейти
            </button>
          </Layout>
        </form>
      </Layout>
    </>
  );
};
