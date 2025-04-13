import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Menu } from './components/Menu';

import { GameDialog } from './pages/GameDialog';
import { AddressBook } from './pages/AddressBook';
import { Questions } from './pages/Questions';
import { Map } from './pages/Map';
import { GameInitializer } from './GameInitializer';

const App: React.FC = () => {
  return (
    <Router>
      <GameInitializer />
      <div className="App bg-arkham-background bg-cover bg-center h-screen">
        <Header />
        <div className="container max-w-screen-lg mx-auto flex flex-row p-4">
          <div className="menu w-40 py-3">
            <Menu />
          </div>
          <div className="content w-[800px] h-[calc(100vh-100px)] flex flex-col gap-3">
            <Routes>
              <Route path="/" element={<GameDialog />} />
              <Route path="/AddressBook" element={<AddressBook />} />
              <Route path="/Map" element={<Map />} />
              <Route path="/Questions" element={<Questions />} />
            </Routes>
          </div>
          <div className="score w-40"></div>
        </div>
      </div>
    </Router>
  );
};

export default App;
