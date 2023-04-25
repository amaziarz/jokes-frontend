import { useAuth } from './context/AuthProvider';
import Container from './layouts/Container';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  );
}

export default App;
