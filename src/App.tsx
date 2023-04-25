import { useAuth } from './context/AuthProvider';
import AppContainer from './layouts/AppContainer';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AppContainer>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </AppContainer>
  );
}

export default App;
