import { useRef, useEffect, FormEvent } from 'react';
import { QuestLocations } from 'data/QuestLocations';
import { GameLogEntry } from 'types/GameLogEntry';
import { useGameStore } from 'store/useGameStore';
import { Typography } from 'components/Typography';
import { LayoutInvestigation } from 'components/LayoutInvestigation';
import { GameDialogForm } from './elements/GameDialogForm';
import { chapters } from 'data/Chapters';
import { NavLink } from 'react-router-dom';
import { AddressBookData } from 'data/AddressBookData';

export const GameDialog = () => {
  const inputDistrict = useRef<HTMLSelectElement>(null);
  const inputNumber = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

  const currentSession = useGameStore(state => state.getCurrentSession());
  const addLogEntry = useGameStore(state => state.addLogEntry);

  const gameLog = currentSession?.log || [];

  function handleNewLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const district = inputDistrict.current?.value || '';
    const number = inputNumber.current?.value || '';

    if (!district || !number) return;

    const value = district + number;

    const lastEntry = gameLog[gameLog.length - 1];
    const newId = lastEntry ? lastEntry.id + 1 : 1;

    if (lastEntry?.location === value) {
      alert('Вы уже находитесь в этой локации');
      return;
    }

    const hasEntry = Boolean(QuestLocations[value]);

    const newEntry: GameLogEntry = {
      id: newId,
      haveClues: hasEntry,
      location: value,
    };

    addLogEntry(newEntry);
  }

  useEffect(() => {
    if (logTextRef.current && gameLog.length > 1) {
      logTextRef.current.scrollTop = logTextRef.current.scrollHeight;
    }
  }, [gameLog.length]);

  if (!currentSession) {
    return (
      <LayoutInvestigation>
        <Typography variant="text">
          Нет активной сессии. Пожалуйста, начните новую игру.
          <br /> Выберите главу в меню <NavLink to="/">Главная</NavLink> и нажмите "Начать игру"
        </Typography>
      </LayoutInvestigation>
    );
  }

  const currentChapter = chapters.find(c => c.id === currentSession.chapterId);

  return (
    <LayoutInvestigation
      formSection={
        !currentSession.isFinished ? (
          <GameDialogForm
            inputDistrict={inputDistrict}
            inputNumber={inputNumber}
            onSubmit={handleNewLocation}
          />
        ) : (
          <Typography variant="text">
            <i>Расследование завершено</i>
          </Typography>
        )
      }
    >
      {currentChapter ? (
        <>
          <Typography variant="heading-1">{currentChapter?.title}</Typography>
          <Typography variant="heading-2">{currentChapter?.subtitle}</Typography>
          <Typography variant="text">
            <article dangerouslySetInnerHTML={{ __html: currentChapter?.description }} />
          </Typography>
        </>
      ) : (
        <Typography variant="heading-2">Неизвестная глава</Typography>
      )}

      {gameLog.map(log => (
        <div key={log.id} className="mb-6">
          {log.haveClues ? (
            <Typography variant="heading-2">
              {log.location}: {AddressBookData.find(a => a.code === log.location)?.name}
            </Typography>
          ) : null}
          <Typography variant="text">
            {log.haveClues ? (
              <article dangerouslySetInnerHTML={{ __html: QuestLocations[log.location].body }} />
            ) : (
              <i>В локации {log.location} вы не нашли никаких зацепок.</i>
            )}
          </Typography>
        </div>
      ))}
    </LayoutInvestigation>
  );
};
