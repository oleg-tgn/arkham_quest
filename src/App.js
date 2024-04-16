import './App.css';
import GameDialog from './components/GameDialog';
import GameLog from "./resourse/GameLog";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Тайны Аркхэма</h1>
      </header>

      <div className='container'>
        <div className='col-65'>
          <GameDialog
            GameLog={GameLog} />
        </div>
        {/* <div className='col'> */}
          {/* <ImageMap /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
