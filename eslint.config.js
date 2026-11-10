import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}',
      '**/node_modules/',
      '**/dist/',
      '**/.astro/',
      '**/.cloudflare/',
      '**/.wrangler/',
      '**/.nimbus/',
      'test-results/',
      'playwright-report/',
      'blob-report/'
    ]
  },
  ...eslintPluginAstro.configs.recommended
]);
