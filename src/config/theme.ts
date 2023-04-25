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
    backgroundColor: colors.white,
    fontColor: colors.grey,
  },
  dark: {
    colors,
    backgroundColor: colors.grey,
    fontColor: colors.white,
  },
};
