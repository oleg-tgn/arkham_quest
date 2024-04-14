import GameLog from "./resourse/GameLog";

function GameDialog() {

    return (
        <div className="arckhem-logs">
        <div className="log-text">
            {GameLog.map((log) => {
                return (                    
                    <div key={log.id} className="log-article">
                        <h2>{log.title}</h2>
                        {log.subtitle && <h3>{log.subtitle}</h3>}
                        <article className="article" dangerouslySetInnerHTML={{ __html: log.body }}></article>
                    </div>
                )
            })}
        </div>            
        <form className="form">
            <input type="text" className="input"/>
            <button className="button">Перейти в локацию</button>
        </form>        
    </div>        
    )
}

export default GameDialog;

