import './App.css';
import GameDialog from './components/GameDialog';
import GameLog from "./resourse/GameLog";
import QuestLocations from "./resourse/QuestLocations";
import ImageMap from "./components/ImageMap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Menu from "./components/Menu";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className='container'>
          <div className='menu'>
            <Menu />
          </div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<GameDialog GameLog={GameLog}/>} />
            </Routes>
          </div>
          <div className='score'></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
