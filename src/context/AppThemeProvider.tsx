import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { appTheme, AppThemeMode } from 'config/theme';

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

interface AppThemeContextValue {
  themeMode: AppThemeMode;
  changeTheme: (themeMode: AppThemeMode) => void;
}

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined,
);

const APP_THEME_STORAGE_KEY = '__theme__';

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function AppThemeProvider({ children }: Props) {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem(
      APP_THEME_STORAGE_KEY,
    ) as AppThemeMode | null;
    return savedTheme || 'light';
  });

  const changeTheme = useCallback((themeMode: AppThemeMode) => {
    setThemeMode(themeMode);
    localStorage.setItem(APP_THEME_STORAGE_KEY, themeMode);
  }, []);

  const theme = appTheme[themeMode];
  const value = useMemo<AppThemeContextValue>(
    () => ({ themeMode, changeTheme }),
    [changeTheme, themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppThemeContext.Provider value={value}>
        <GlobalStyle />
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
}

export default AppThemeProvider;
