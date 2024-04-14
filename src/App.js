import './App.css';
import GameDialog from './components/GameDialog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Тайны Аркхэма</h1>
      </header>

      <div className='container'>
        <div className='col-65'>
          <GameDialog />
        </div>
        {/* <div className='col'> */}
          {/* <ImageMap /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
