import { ChangeEvent, ReactNode } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useAppTheme } from 'common/hooks/useAppTheme';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
  }
  
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    margin: 0;
  }
`;

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  const { theme, themeMode, changeTheme } = useAppTheme();

  function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
    changeTheme(e.target.checked ? 'dark' : 'light');
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
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
    </ThemeProvider>
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
