import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['**/*.astro'],
    extends: [tseslint.configs.recommendedTypeChecked]
  }, // TypeScript ESLint does not support .astro files
  { languageOptions: { parserOptions: { projectService: true } } },
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.astro',
      '**/__coverage__',
      '**/.changeset',
      '**/pnpm-*.yaml',
      '**/pre-commit',
      '**/.prettierignore',
      'test-results/',
      'playwright-report/',
      'blob-report/',
      'playwright/.cache/',
      '**/.wrangler/'
    ]
  }
]);
