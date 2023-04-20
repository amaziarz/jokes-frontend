import { Route, Routes } from 'react-router-dom';
import Jokes from './pages/Jokes';

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/jokes" element={<Jokes />} />
    </Routes>
  );
}

export default AuthenticatedApp;
