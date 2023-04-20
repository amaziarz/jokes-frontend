import { DefaultTheme } from 'styled-components';

export type AppThemeMode = 'light' | 'dark';

type AppThemeConfig = {
  [mode in AppThemeMode]: DefaultTheme;
};

export const appTheme: AppThemeConfig = {
  light: {
    backgroundColor: '#ffffff',
    fontColor: '#333333',
  },
  dark: {
    backgroundColor: '#333333',
    fontColor: '#ffffff',
  },
};
