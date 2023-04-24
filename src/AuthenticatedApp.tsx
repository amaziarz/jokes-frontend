import { Route, Routes } from 'react-router-dom';
import Jokes from './pages/Jokes/Jokes';
import EditJoke from './pages/EditJoke/EditJoke';

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/jokes" element={<Jokes />} />
      <Route path="/jokes/:jokeId" element={<EditJoke />} />
    </Routes>
  );
}

export default AuthenticatedApp;
