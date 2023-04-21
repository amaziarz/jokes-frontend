import { DefaultTheme } from 'styled-components';

export type AppThemeMode = 'light' | 'dark';

type AppThemeConfig = {
  [mode in AppThemeMode]: DefaultTheme;
};

const colors = {
  white: '#ffffff',
  grey: '#333333',
};

export const appTheme: AppThemeConfig = {
  light: {
    colors,
    backgroundColor: '#ffffff',
    fontColor: '#333333',
  },
  dark: {
    colors,
    backgroundColor: '#333333',
    fontColor: '#ffffff',
  },
};
