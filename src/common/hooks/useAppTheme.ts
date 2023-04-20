import { useCallback, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import { appTheme, AppThemeMode } from 'config/theme';

const APP_THEME_STORAGE_KEY = '__theme__';

interface UseAppThemeResult {
  theme: DefaultTheme;
  themeMode: AppThemeMode;
  changeTheme: (themeMode: AppThemeMode) => void;
}

export function useAppTheme(): UseAppThemeResult {
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

  return {
    theme: appTheme[themeMode],
    themeMode,
    changeTheme,
  };
}
