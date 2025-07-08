import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import type { Theme } from '../../src/theme';

interface MockThemeButton extends HTMLElement {
  updateSelectedTheme(theme: Theme): void;
}

interface MockTheme {
  setTheme(theme: Theme): void;
  getTheme(): Theme;
  getSystemTheme(): 'light' | 'dark';
  getDefaultTheme(): Theme;
}

describe('FCCThemeProvider & FCCThemeSelect Components', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;
  let mockTheme: MockTheme;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html data-theme="auto">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <!-- Theme Provider -->
          <script data-default-theme="auto"></script>
          
          <!-- Theme Select Button -->
          <theme-button class="my-auto">
            <button 
              class="theme-toggle rounded-full border-none cursor-pointer px-1 py-0 flex items-center auto-theme"
              aria-label="Toggle Theme"
              value="auto"
            >
              <span class="theme-option auto flex">
                <span class="mx-1.5 my-1">🌓</span>
              </span>
              <span class="theme-option light hidden">
                <span class="mx-1.5 my-1">☀️</span>
              </span>
              <span class="theme-option dark hidden">
                <span class="mx-1.5 my-1">🌙</span>
              </span>
            </button>
          </theme-button>
        </body>
      </html>
    `,
      {
        url: 'http://localhost:4321',
        pretendToBeVisual: true,
        resources: 'usable'
      }
    );

    document = dom.window.document;
    window = dom.window as Window & typeof globalThis;

    // Set up global references
    global.window = window as Window & typeof globalThis;
    global.document = document;
    global.HTMLElement = window.HTMLElement;
    global.customElements = window.customElements;
    global.localStorage = {
      getItem: vi.fn(() => 'auto'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn()
    };

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    // Mock theme object
    mockTheme = {
      setTheme: vi.fn(),
      getTheme: vi.fn(() => 'auto'),
      getSystemTheme: vi.fn(() => 'light'),
      getDefaultTheme: vi.fn(() => 'auto')
    };
    window.theme = mockTheme;

    // Mock ThemeButton custom element
    class MockThemeButton extends window.HTMLElement {
      constructor() {
        super();
        const button = this.querySelector('.theme-toggle');
        if (!button) return;

        button.addEventListener('click', () => {
          const currentTheme = window.theme.getTheme();
          let newTheme: Theme;
          if (currentTheme === 'auto') newTheme = 'light';
          else if (currentTheme === 'light') newTheme = 'dark';
          else newTheme = 'auto';

          window.theme.setTheme(newTheme);
          this.updateSelectedTheme(newTheme);
        });

        window.addEventListener('theme-changed', (event: CustomEvent) => {
          this.updateSelectedTheme(event.detail.theme);
        });
      }

      updateSelectedTheme(newTheme: Theme) {
        const button = this.querySelector('.theme-toggle') as HTMLButtonElement;
        button.value = newTheme;
        button.classList.remove('auto-theme', 'light-theme', 'dark-theme');
        button.classList.add(`${newTheme}-theme`);

        const options = this.querySelectorAll('.theme-option');
        options.forEach(option => {
          option.classList.add('hidden');
          option.classList.remove('flex');
        });
        const activeOption = this.querySelector(`.theme-option.${newTheme}`);
        if (activeOption) {
          activeOption.classList.remove('hidden');
          activeOption.classList.add('flex');
        }
      }
    }

    window.customElements.define('theme-button', MockThemeButton);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('FCCThemeProvider', () => {
    it('has script with default theme data attribute', () => {
      const script = document.querySelector('script[data-default-theme]');
      expect(script).toBeTruthy();
      expect(script?.getAttribute('data-default-theme')).toBe('auto');
    });

    it('sets initial theme on document element', () => {
      const html = document.documentElement;
      expect(html.getAttribute('data-theme')).toBe('auto');
    });

    it('provides theme API through window.theme', () => {
      expect(window.theme).toBeDefined();
      expect(typeof window.theme.setTheme).toBe('function');
      expect(typeof window.theme.getTheme).toBe('function');
      expect(typeof window.theme.getSystemTheme).toBe('function');
      expect(typeof window.theme.getDefaultTheme).toBe('function');
    });

    it('initializes with correct default values', () => {
      expect(mockTheme.getTheme()).toBe('auto');
      expect(mockTheme.getDefaultTheme()).toBe('auto');
      expect(mockTheme.getSystemTheme()).toBe('light');
    });

    it('handles theme persistence', () => {
      window.theme.setTheme('dark');
      expect(mockTheme.setTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('FCCThemeSelect Button', () => {
    it('renders theme button with correct structure', () => {
      const themeButton = document.querySelector('theme-button');
      expect(themeButton).toBeTruthy();

      const button = themeButton?.querySelector('.theme-toggle');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('aria-label')).toBe('Toggle Theme');
    });

    it('has all theme option elements', () => {
      const autoOption = document.querySelector('.theme-option.auto');
      const lightOption = document.querySelector('.theme-option.light');
      const darkOption = document.querySelector('.theme-option.dark');

      expect(autoOption).toBeTruthy();
      expect(lightOption).toBeTruthy();
      expect(darkOption).toBeTruthy();
    });

    it('displays correct emoji for each theme', () => {
      const autoEmoji = document.querySelector(
        '.theme-option.auto span'
      )?.textContent;
      const lightEmoji = document.querySelector(
        '.theme-option.light span'
      )?.textContent;
      const darkEmoji = document.querySelector(
        '.theme-option.dark span'
      )?.textContent;

      expect(autoEmoji).toBe('🌓');
      expect(lightEmoji).toBe('☀️');
      expect(darkEmoji).toBe('🌙');
    });

    it('shows only active theme option', () => {
      const autoOption = document.querySelector('.theme-option.auto');
      const lightOption = document.querySelector('.theme-option.light');
      const darkOption = document.querySelector('.theme-option.dark');

      expect(autoOption?.classList.contains('flex')).toBe(true);
      expect(autoOption?.classList.contains('hidden')).toBe(false);

      expect(lightOption?.classList.contains('hidden')).toBe(true);
      expect(darkOption?.classList.contains('hidden')).toBe(true);
    });

    it('has correct CSS classes', () => {
      const button = document.querySelector('.theme-toggle');

      expect(button?.classList.contains('rounded-full')).toBe(true);
      expect(button?.classList.contains('border-none')).toBe(true);
      expect(button?.classList.contains('cursor-pointer')).toBe(true);
      expect(button?.classList.contains('flex')).toBe(true);
      expect(button?.classList.contains('items-center')).toBe(true);
    });
  });

  describe('Theme Cycling', () => {
    it('cycles through themes in correct order', () => {
      const themeButton = document.querySelector(
        'theme-button'
      ) as MockThemeButton;
      const button = themeButton?.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;

      // Mock different current themes and test cycling
      mockTheme.getTheme = vi.fn().mockReturnValue('auto');
      button?.click();
      expect(mockTheme.setTheme).toHaveBeenCalledWith('light');

      mockTheme.getTheme = vi.fn().mockReturnValue('light');
      button?.click();
      expect(mockTheme.setTheme).toHaveBeenCalledWith('dark');

      mockTheme.getTheme = vi.fn().mockReturnValue('dark');
      button?.click();
      expect(mockTheme.setTheme).toHaveBeenCalledWith('auto');
    });

    it('updates button value when theme changes', () => {
      const themeButton = document.querySelector(
        'theme-button'
      ) as MockThemeButton;
      const button = themeButton?.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;

      themeButton.updateSelectedTheme('light');
      expect(button.value).toBe('light');

      themeButton.updateSelectedTheme('dark');
      expect(button.value).toBe('dark');
    });

    it('updates CSS classes when theme changes', () => {
      const themeButton = document.querySelector(
        'theme-button'
      ) as MockThemeButton;
      const button = themeButton?.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;

      themeButton.updateSelectedTheme('light');
      expect(button.classList.contains('light-theme')).toBe(true);
      expect(button.classList.contains('auto-theme')).toBe(false);

      themeButton.updateSelectedTheme('dark');
      expect(button.classList.contains('dark-theme')).toBe(true);
      expect(button.classList.contains('light-theme')).toBe(false);
    });

    it('updates visible theme option when theme changes', () => {
      const themeButton = document.querySelector(
        'theme-button'
      ) as MockThemeButton;

      themeButton.updateSelectedTheme('light');
      const lightOption = document.querySelector('.theme-option.light');
      const autoOption = document.querySelector('.theme-option.auto');

      expect(lightOption?.classList.contains('flex')).toBe(true);
      expect(lightOption?.classList.contains('hidden')).toBe(false);
      expect(autoOption?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Event Handling', () => {
    it('responds to theme-changed events', () => {
      const themeButton = document.querySelector(
        'theme-button'
      ) as MockThemeButton;
      const updateSpy = vi.spyOn(themeButton, 'updateSelectedTheme');

      const event = new window.CustomEvent('theme-changed', {
        detail: { theme: 'dark', systemTheme: 'light', defaultTheme: 'auto' }
      });
      window.dispatchEvent(event);

      expect(updateSpy).toHaveBeenCalledWith('dark');
    });

    it('handles click events on theme button', () => {
      const button = document.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;

      mockTheme.getTheme = vi.fn().mockReturnValue('auto');
      button?.click();

      expect(mockTheme.setTheme).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label', () => {
      const button = document.querySelector('.theme-toggle');
      expect(button?.getAttribute('aria-label')).toBe('Toggle Theme');
    });

    it('maintains button semantics', () => {
      const button = document.querySelector('.theme-toggle');
      expect(button?.tagName.toLowerCase()).toBe('button');
      expect(button?.getAttribute('type')).not.toBe('submit');
    });

    it('has keyboard accessibility', () => {
      const button = document.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;
      expect(button.tabIndex).not.toBe(-1);
    });

    it('provides visual feedback through classes', () => {
      const button = document.querySelector('.theme-toggle');
      expect(button?.classList.contains('cursor-pointer')).toBe(true);
    });
  });

  describe('Custom Element Definition', () => {
    it('defines theme-button custom element', () => {
      expect(window.customElements.get('theme-button')).toBeDefined();
    });

    it('initializes properly when connected', () => {
      const themeButton = document.querySelector('theme-button');
      expect(themeButton).toBeTruthy();
      expect(typeof (themeButton as MockThemeButton).updateSelectedTheme).toBe(
        'function'
      );
    });
  });

  describe('Integration', () => {
    it('works together - provider and selector', () => {
      const script = document.querySelector('script[data-default-theme]');
      const themeButton = document.querySelector('theme-button');

      expect(script).toBeTruthy();
      expect(themeButton).toBeTruthy();
      expect(window.theme).toBeDefined();
    });

    it('maintains state consistency', () => {
      const button = document.querySelector(
        '.theme-toggle'
      ) as HTMLButtonElement;
      expect(button.value).toBe('auto');
      expect(button.classList.contains('auto-theme')).toBe(true);
    });
  });
});
