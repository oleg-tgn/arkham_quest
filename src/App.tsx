import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { GameDialog } from './pages/GameDialog';
import { AddressBook } from './pages/AddressBook';
import { Questions } from './pages/Questions';
import { Map } from './pages/Map';
import { Home } from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './pages/Login';

const App = () => (
  <Router>
    <div className="bg-arkham-background bg-cover bg-center h-screen">
      <Header />
      <div className="mx-auto flex flex-row justify-center p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/Investigation"
            element={
              <PrivateRoute>
                <GameDialog />
              </PrivateRoute>
            }
          />
          <Route
            path="/AddressBook"
            element={
              <PrivateRoute>
                <AddressBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/Map"
            element={
              <PrivateRoute>
                <Map />
              </PrivateRoute>
            }
          />
          <Route
            path="/Questions"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
