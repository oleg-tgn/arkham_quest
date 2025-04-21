import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from 'components/Header';
import { GameDialog } from 'pages/GameDialog';
import { AddressBook } from 'pages/AddressBook';
import { Questions } from 'pages/Questions';
import { Map } from 'pages/Map';
import { Home } from 'pages/Home';
import PrivateRoute from 'components/PrivateRoute';
import { Login } from 'pages/Login';
import { useFirebaseGameSync } from 'hooks/useFirebaseGameSync';
import { NewGame } from 'pages/NewGame';
import { Continue } from 'pages/Continue/Continue';
import { Archive } from 'pages/Archive';
import { About } from 'pages/About';

const App = () => {
  useFirebaseGameSync();

  return (
    <Router>
      <div className="bg-arkham-background bg-cover bg-center h-screen">
        <Header />
        <div className="mx-auto flex flex-row justify-center p-4">
          <Routes>
            {/* Публичный маршрут */}
            <Route path="/" element={<Login />} />

            {/* Группа приватных маршрутов */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/newGame" element={<NewGame />} />
              <Route path="/continue" element={<Continue />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/about" element={<About />} />
              <Route path="/Investigation" element={<GameDialog />} />
              <Route path="/AddressBook" element={<AddressBook />} />
              <Route path="/Map" element={<Map />} />
              <Route path="/Questions" element={<Questions />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
