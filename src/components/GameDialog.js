import React, { useRef, useEffect } from 'react';
import QuestLocations from "../data/QuestLocations";
import { useStateContext } from '../contexts/StateContext';

function GameDialog(props) {    
    const inputDistrict = useRef(null);
    const inputNumber = useRef(null);

    const logTextRef = useRef(null);
    // const [gameLog, setGameLog] = useState(GameLog);
    const { gameLog, setGameLog } = useStateContext();

    //const { gameLogScrollPosition, setGameLogScrollPosition } = useStateContext();

    function handleNewLocation(event) {
        event.preventDefault();
        if (!inputDistrict.current.value || !inputNumber.current.value) {
            return;
        }

        const value = inputDistrict.current.value + inputNumber.current.value;
                
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
            setGameLog([...gameLog, { 
                ...nextLocation, 
                id: newId,
                subtitle: value,
                code: value,
             }]);
        } else {
            const errorLogEntry = {
                id: newId,
                title: null,
                subtitle: null,
                body: `<i>В локации ${value} вы не нашли никаких зацепок.</i>` // Текстовое представление перехода
            };
            setGameLog([...gameLog, errorLogEntry]);
        }        
    }

    useEffect(() => {
        if (logTextRef.current && gameLog.length > 1) {
            logTextRef.current.scrollTop = logTextRef.current.scrollHeight;
        }
    }, [gameLog.length]);

    // useEffect(() => {
    //     if (logTextRef.current) {
    //         logTextRef.current.scrollTop = gameLogScrollPosition;
    //     }
    // }, []);

    // const handleScroll = useCallback(() => {
    //     setGameLogScrollPosition(logTextRef.current.scrollTop);
    // }, [setGameLogScrollPosition]);

    // useEffect(() => {
    //     const logTextNode = logTextRef.current;
    //     if (logTextNode) {
    //         logTextNode.addEventListener('scroll', handleScroll);
    //         return () => {
    //             logTextNode.removeEventListener('scroll', handleScroll);
    //         };
    //     }
    // }, [handleScroll]);

    return (
        <div className="arckhem-logs">
            <div className="log-text" ref={logTextRef}>
                {gameLog.map((log) => {
                    return (                    
                        <div key={log.id} className="log-article">
                            {log.title && <h2>{log.title}</h2>}
                            {log.subtitle && <h3>{log.subtitle}</h3>}
                            <article className="article" dangerouslySetInnerHTML={{ __html: log.body }}></article>
                        </div>
                    )
                })}
            </div>            
            <form onSubmit={handleNewLocation} className="form">
                <label>Локация: </label>
                <select ref={inputDistrict}>
                    <option value="" >Выбирите локацию</option>
                    <option value="А">А — Аптаун </option>
                    <option value="Д">Д — Даунтаун</option>
                    <option value="И">И — Исттаун</option>
                    <option value="Н">Н — Нортсайд</option>
                    <option value="Р">Р — Ривертаун</option>
                    <option value="Т">Т — Торговый район </option>
                    <option value="У">У — Университетский район</option>
                    <option value="Ф">Ф — Френч-хилл</option>
                </select>
                <label>Код: </label>
                <input type="number" min="1" max="100" className="input" placeholder="Напишите номер локации. Например '10'"
                    ref={inputNumber}/>
                <button type="submit" className="button">Перейти в локацию</button>
            </form>        
        </div>        
    )
}

export default GameDialog;

