import { useRef, useEffect, FormEvent } from 'react';
import { QuestLocations } from 'data/QuestLocations';
import { GameLogEntry } from 'types/GameLogEntry';
import { useGameStore } from 'store/useGameStore';
import { Typography } from 'components/Typography';
import { LayoutInvestigation } from 'components/LayoutInvestigation';
import { GameDialogForm } from './elements/GameDialogForm';

export const GameDialog = () => {
  const inputDistrict = useRef<HTMLSelectElement>(null);
  const inputNumber = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

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
    <LayoutInvestigation
      formSection={
        <GameDialogForm
          inputDistrict={inputDistrict}
          inputNumber={inputNumber}
          onSubmit={handleNewLocation}
        />
      }
    >
      {gameLog.map(log => (
        <div key={log.id} className="mb-6">
          {log.title ? <Typography variant="heading-1">{log.title}</Typography> : null}
          {log.subtitle ? <Typography variant="heading-2">{log.subtitle}</Typography> : null}
          <Typography variant="text">
            <article dangerouslySetInnerHTML={{ __html: log.body }} />
          </Typography>
        </div>
      ))}
    </LayoutInvestigation>
  );
};
