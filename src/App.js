import logo from './logo.svg';
import './App.css';
import ImageMap from './ImageMap'
import GameDialog from './GameDialog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Тайны Аркхэма</h1>
      </header>

      <div className='container'>
        <div className='col'>
          <GameDialog />
        </div>
        <div className='col'>
          {/* <ImageMap /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
