import eslintPluginAstro from 'eslint-plugin-astro';
export default [
  ...eslintPluginAstro.configs.recommended,
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
];
