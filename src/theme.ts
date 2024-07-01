export type Theme = 'auto' | 'light' | 'dark';

export class ThemeChangeEvent extends CustomEvent<{
  theme: Theme;
  systemTheme: 'light' | 'dark';
  defaultTheme: string;
}> {}

declare global {
  interface WindowEventMap {
    'theme-changed': ThemeChangeEvent;
  }
}
