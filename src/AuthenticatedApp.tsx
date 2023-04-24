import { Route, Routes } from 'react-router-dom';
import JokeFormContainer from './layouts/JokeFormContainer';
import Jokes from './pages/Jokes/Jokes';
import EditJoke from './pages/EditJoke/EditJoke';
import AddJoke from './pages/AddJoke/AddJoke';

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/jokes" element={<Jokes />} />
      <Route element={<JokeFormContainer />}>
        <Route path="/jokes/:jokeId" element={<EditJoke />} />
        <Route path="/jokes/new" element={<AddJoke />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedApp;
