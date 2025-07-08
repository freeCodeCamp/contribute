import { afterEach, vi, beforeAll } from 'vitest';

// Mock Astro content collections before any imports
beforeAll(() => {
  // Mock astro:content module
  vi.mock('astro:content', () => ({
    getEntry: vi.fn().mockResolvedValue({
      data: {
        'nav.home': 'Home',
        'nav.docs': 'Docs',
        'getting-started': 'Getting Started',
        FAQ: 'FAQ'
      }
    }),
    getCollection: vi.fn().mockResolvedValue([])
  }));
});

// Global cleanup after each test
afterEach(() => {
  // Clear all timers
  vi.clearAllTimers();

  // Clear all mocks except the persistent Astro mocks
  vi.clearAllMocks();

  // Reset DOM if needed
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  }

  // Clear global window modifications
  if (typeof global !== 'undefined') {
    const globalObj = global as Record<string, unknown>;
    delete globalObj.window;
    delete globalObj.document;
    delete globalObj.HTMLElement;
    delete globalObj.customElements;
    delete globalObj.localStorage;
  }
});
