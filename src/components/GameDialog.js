import React, { useRef, useState, useEffect } from 'react';

function GameDialog(props) {    
    const inputRef = useRef(null);
    const logTextRef = useRef(null);
    const [gameLog, setGameLog] = useState(props.GameLog);
    const [initialized, setInitialized] = useState(false);

    function handleNewLocation(event) {
        event.preventDefault();

        const value = inputRef.current.value;
        if (/[^а-яА-Я0-9\s]/.test(value)) {
            alert('Пожалуйста, используйте русскую раскладку');
            return;
        }

        const newId = gameLog[gameLog.length - 1].id + 1;
        const newLogEntry = {
            id: newId,
            title: null,
            subtitle: null,
            body: `<i>Переход в локацию ${value}</i>` // Текстовое представление перехода
        };
    
        setGameLog([...gameLog, newLogEntry]);

        if (logTextRef.current) {
            logTextRef.current.scrollTop = logTextRef.current.scrollHeight;
        }
        if (!initialized) {
            setInitialized(true);  // Устанавливаем инициализацию при первом добавлении
        }
    }

    // Эффект для прокрутки
    useEffect(() => {
        if (initialized && logTextRef.current) {
            logTextRef.current.scrollTop = logTextRef.current.scrollHeight;
        }
    }, [gameLog, initialized]);  // Зависимость от gameLog, прокрутка после обновления DOM

    return (
        <div className="arckhem-logs">
            <div className="log-text" ref={logTextRef}>
                {gameLog.map((log) => {
                    return (                    
                        <div key={log.id} className="log-article">
                            <h2>{log.title}</h2>
                            {log.subtitle && <h3>{log.subtitle}</h3>}
                            <article className="article" dangerouslySetInnerHTML={{ __html: log.body }}></article>
                        </div>
                    )
                })}
            </div>            
            <form onSubmit={handleNewLocation} className="form">
                <input type="text" className="input" placeholder="Напишите код локации, например 'A1'"
                    ref={inputRef}/>
                <button type="submit" className="button">Перейти в локацию</button>
            </form>        
        </div>        
    )
}

export default GameDialog;

