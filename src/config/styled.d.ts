import 'styled-components';

declare module 'styled-components' {
  type ColorKey = 'white' | 'grey';
  export interface DefaultTheme {
    colors: Record<ColorKey, string>;
    backgroundColor: string;
    fontColor: string;
  }
}
