import { useState } from 'react';
import styled from 'styled-components';
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
    <Wrapper>
      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vh;
`;

export default UnauthenticatedApp;
