import React, { useRef, useEffect, FormEvent } from 'react';
import { QuestLocations } from "../data/QuestLocations";
import { useStateContext } from '../contexts/StateContext';
import { GameLogEntry } from '../types/GameLogEntry';

const GameDialog: React.FC = () => {
  const inputDistrict = useRef<HTMLSelectElement>(null);
  const inputNumber = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

  const { gameLog, setGameLog } = useStateContext();

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
        alert("Вы уже находитесь в этой локации");
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
    <div className="arckhem-logs">
      <div className="log-text" ref={logTextRef}>
        {gameLog.map((log) => (
          <div key={log.id} className="log-article">
            {log.title && <h2>{log.title}</h2>}
            {log.subtitle && <h3>{log.subtitle}</h3>}
            <article className="article" dangerouslySetInnerHTML={{ __html: log.body }} />
          </div>
        ))}
      </div>
      <form onSubmit={handleNewLocation} className="form">
        <label>Локация: </label>
        <select ref={inputDistrict}>
          <option value="">Выбирите локацию</option>
          <option value="А">А — Аптаун </option>
          <option value="Д">Д — Даунтаун</option>
          <option value="И">И — Исттаун</option>
          <option value="Н">Н — Нортсайд</option>
          <option value="Р">Р — Ривертаун</option>
          <option value="С">С — Саутсайд</option>
          <option value="Т">Т — Торговый район </option>
          <option value="У">У — Университетский район</option>
          <option value="Ф">Ф — Френч-хилл</option>
        </select>
        <label>Код: </label>
        <input
          type="number"
          min="1"
          max="100"
          className="input"
          placeholder="Напишите номер локации. Например '10'"
          ref={inputNumber}
        />
        <button type="submit" className="button">Перейти в локацию</button>
      </form>
    </div>
  );
};

export default GameDialog;
