import { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { useAppTheme } from 'context/AppThemeProvider';

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  const { themeMode, changeTheme } = useAppTheme();

  function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
    changeTheme(e.target.checked ? 'dark' : 'light');
  }

  return (
    <AppContainer>
      <CheckboxWrapper>
        <input
          id="darkMode"
          type="checkbox"
          onChange={handleThemeChange}
          checked={themeMode === 'dark'}
        />
        <label htmlFor="darkMode">Dark</label>
      </CheckboxWrapper>
      {children}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 32px 64px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.25rem;
`;

export default Container;
