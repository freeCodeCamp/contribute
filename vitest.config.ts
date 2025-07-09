/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['./tests/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude, '**/e2e/**'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
});
