import { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { useAppTheme } from 'context/AppThemeProvider';
import { useAuth } from 'context/AuthProvider';

interface Props {
  children: ReactNode;
}

function AppContainer({ children }: Props) {
  const { themeMode, changeTheme } = useAppTheme();
  const { isAuthenticated, logout } = useAuth();

  function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
    changeTheme(e.target.checked ? 'dark' : 'light');
  }

  return (
    <Wrapper>
      <Header>
        <ButtonsWrapper>
          {isAuthenticated ? (
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          ) : null}
          <Checkbox>
            <input
              id="darkMode"
              type="checkbox"
              onChange={handleThemeChange}
              checked={themeMode === 'dark'}
            />
            <label htmlFor="darkMode">Dark</label>
          </Checkbox>
        </ButtonsWrapper>
      </Header>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 32px 64px;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutButton = styled.button`
  margin-bottom: 16px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;

  label {
    font-size: 1.25rem;
    margin-left: 0.25rem;
  }
`;

export default AppContainer;
