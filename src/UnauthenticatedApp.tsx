import { useState } from 'react';
import { useAuth } from 'context/AuthProvider';

function UnauthenticatedApp() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    login().finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 50vh;
      `}
    >
      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
    </div>
  );
}

export default UnauthenticatedApp;
