import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateProvider } from './contexts/StateContext';

import Header from "./components/Header";
import Menu from "./components/Menu";

import GameDialog from './components/GameDialog';
import AddressBook from "./components/AddressBook";

import './App.css';

function App() {
  return (
    <StateProvider>
      <Router>
        <div className="App">
          <Header />

          <div className='container'>
            <div className='menu'>
              <Menu />
            </div>
            <div className='content'>
              <Routes>
                <Route path="/" element={<GameDialog/>} />
                <Route path="/AddressBook" element={<AddressBook />} />
              </Routes>
            </div>
            <div className='score'></div>
          </div>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
