import { afterEach, vi, beforeAll } from 'vitest';

// Track unhandled errors for better debugging
const originalConsoleError = console.error;
console.error = (...args) => {
  // Check if this is an unhandled error we want to track
  if (args.some(arg => typeof arg === 'object' && arg !== null)) {
    // Convert objects to string for better error reporting
    const stringifiedArgs = args.map(arg =>
      typeof arg === 'object' && arg !== null
        ? JSON.stringify(arg, null, 2)
        : arg
    );
    originalConsoleError.apply(console, stringifiedArgs);
  } else {
    originalConsoleError.apply(console, args);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
});

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

  // Clear JSDOM instances properly
  if (typeof window !== 'undefined' && window.close) {
    try {
      window.close();
    } catch (e) {
      // Ignore errors during window cleanup
    }
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
