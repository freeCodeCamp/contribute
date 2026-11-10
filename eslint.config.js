import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['**/*.astro'],
    extends: [tseslint.configs.recommendedTypeChecked]
  }, // TypeScript ESLint does not support .astro files
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: { parserOptions: { projectService: true } }
  },
  {
    files: ['src/components/**/*.client.ts'],
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { arguments: false, properties: false } }
      ]
    }
  },
  {
    files: ['src/components.ts'],
    rules: { '@typescript-eslint/no-unsafe-assignment': 'off' }
  },
  {
    files: ['src/lib/variants.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true }
      ]
    }
  },
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
      '**/.wrangler/',
      '**/.cloudflare/',
      '**/.nimbus/'
    ]
  }
]);
