import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateProvider } from './contexts/StateContext';

import Header from "./components/Header";
import Menu from "./components/Menu";

import GameDialog from './components/GameDialog';
import AddressBook from "./components/AddressBook";
import Questions from "./components/Questions";

const App: React.FC = () => {
  return (
    <StateProvider>
      <Router>
        <div className="App bg-arkham-background bg-cover bg-center text-arkham-text h-screen overflow-y-auto">
          <Header />
          <div className="container max-w-screen-lg mx-auto flex flex-row gap-4 p-4">
            <div className="menu w-[15%] bg-arkham-panel rounded-xl shadow-md p-3 text-arkham-text">
              <Menu />
            </div>
            <div className="content w-[70%] h-[calc(100vh-150px)] border border-arkham-border bg-arkham-panel rounded-xl shadow-inner p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<GameDialog />} />
                <Route path="/AddressBook" element={<AddressBook />} />
                <Route path="/Questions" element={<Questions />} />
              </Routes>
            </div>
            <div className="score w-[15%]"></div>
          </div>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
