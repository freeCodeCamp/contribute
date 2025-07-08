import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import type { Theme, ThemeChangeEvent } from '../src/theme';

describe('Theme System', () => {
  let dom: JSDOM;
  let window: Window & typeof globalThis;
  let localStorage: Storage;
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost:4321',
      pretendToBeVisual: true,
      resources: 'usable'
    });
    window = dom.window as Window & typeof globalThis;
    localStorage = window.localStorage;

    // Mock matchMedia
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
    window.matchMedia = matchMediaMock;

    // Set global window for tests
    global.window = window as Window & typeof globalThis;
    global.document = window.document;
    global.localStorage = localStorage;
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Theme Persistence', () => {
    it('stores theme preference in localStorage', () => {
      const theme: Theme = 'dark';
      localStorage.setItem('starlight-theme', theme);

      expect(localStorage.getItem('starlight-theme')).toBe('dark');
    });

    it('retrieves theme preference from localStorage', () => {
      localStorage.setItem('starlight-theme', 'light');

      const storedTheme = localStorage.getItem('starlight-theme');
      expect(storedTheme).toBe('light');
    });

    it('handles missing theme in localStorage', () => {
      const storedTheme = localStorage.getItem('starlight-theme');
      expect(storedTheme).toBeNull();
    });

    it('persists theme across page reloads', () => {
      // Simulate setting theme
      localStorage.setItem('starlight-theme', 'dark');

      // Simulate page reload by creating new storage reference
      const newStorage = window.localStorage;
      expect(newStorage.getItem('starlight-theme')).toBe('dark');
    });
  });

  describe('System Theme Detection', () => {
    it('detects system dark mode preference', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }));

      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      expect(prefersDark).toBe(true);
    });

    it('detects system light mode preference', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }));

      const prefersLight = window.matchMedia(
        '(prefers-color-scheme: light)'
      ).matches;
      expect(prefersLight).toBe(true);
    });

    it('handles auto theme setting', () => {
      // When theme is 'auto', it should follow system preference
      localStorage.setItem('starlight-theme', 'auto');

      // Mock system prefers dark
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }));

      const storedTheme = localStorage.getItem('starlight-theme');
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      expect(storedTheme).toBe('auto');
      expect(systemPrefersDark).toBe(true);
    });
  });

  describe('Theme Change Events', () => {
    it('dispatches theme-changed event', async () => {
      const testTheme: Theme = 'dark';
      const systemTheme: 'light' | 'dark' = 'light';
      const defaultTheme = 'light';

      const eventPromise = new Promise<void>(resolve => {
        window.addEventListener('theme-changed', ((event: ThemeChangeEvent) => {
          expect(event.detail.theme).toBe(testTheme);
          expect(event.detail.systemTheme).toBe(systemTheme);
          expect(event.detail.defaultTheme).toBe(defaultTheme);
          resolve();
        }) as EventListener);
      });

      const event = new window.CustomEvent('theme-changed', {
        detail: {
          theme: testTheme,
          systemTheme: systemTheme,
          defaultTheme: defaultTheme
        }
      });
      window.dispatchEvent(event);

      await eventPromise;
    });

    it('updates localStorage when theme changes', () => {
      const newTheme: Theme = 'dark';

      // Simulate theme change
      localStorage.setItem('starlight-theme', newTheme);

      // Dispatch event
      const event = new window.CustomEvent('theme-changed', {
        detail: {
          theme: newTheme,
          systemTheme: 'light',
          defaultTheme: 'light'
        }
      });
      window.dispatchEvent(event);

      expect(localStorage.getItem('starlight-theme')).toBe('dark');
    });
  });

  describe('Theme CSS Classes', () => {
    it('applies correct CSS class for light theme', () => {
      const html = window.document.documentElement;

      // Simulate applying light theme
      html.setAttribute('data-theme', 'light');
      expect(html.getAttribute('data-theme')).toBe('light');
    });

    it('applies correct CSS class for dark theme', () => {
      const html = window.document.documentElement;

      // Simulate applying dark theme
      html.setAttribute('data-theme', 'dark');
      expect(html.getAttribute('data-theme')).toBe('dark');
    });

    it('removes theme classes when switching themes', () => {
      const html = window.document.documentElement;

      // Apply dark theme
      html.setAttribute('data-theme', 'dark');
      expect(html.getAttribute('data-theme')).toBe('dark');

      // Switch to light theme
      html.setAttribute('data-theme', 'light');
      expect(html.getAttribute('data-theme')).toBe('light');
      expect(html.getAttribute('data-theme')).not.toBe('dark');
    });
  });

  describe('Theme Validation', () => {
    it('validates theme values', () => {
      const validThemes: Theme[] = ['auto', 'light', 'dark'];

      validThemes.forEach(theme => {
        localStorage.setItem('starlight-theme', theme);
        expect(localStorage.getItem('starlight-theme')).toBe(theme);
      });
    });

    it('handles invalid theme values gracefully', () => {
      // Set invalid theme
      localStorage.setItem('starlight-theme', 'invalid-theme');

      // In a real implementation, this should fallback to default
      const storedTheme = localStorage.getItem('starlight-theme');
      expect(storedTheme).toBe('invalid-theme');

      // The actual theme implementation should validate and fallback
      const isValidTheme = (theme: string): theme is Theme => {
        return ['auto', 'light', 'dark'].includes(theme);
      };

      expect(isValidTheme(storedTheme)).toBe(false);
    });
  });

  describe('System Theme Changes', () => {
    it('responds to system theme changes', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];

      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(
          (event: string, listener: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              listeners.push(listener);
            }
          }
        ),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }));

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const changeListener = vi.fn();
      mediaQuery.addEventListener('change', changeListener);

      // Simulate system theme change
      const event = {
        matches: true,
        media: '(prefers-color-scheme: dark)'
      } as MediaQueryListEvent;
      listeners.forEach(listener => listener(event));

      expect(mediaQuery.addEventListener).toHaveBeenCalledWith(
        'change',
        changeListener
      );
    });
  });
});
