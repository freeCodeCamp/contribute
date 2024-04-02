module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {},
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      processor: 'astro/client-side-ts',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {}
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    }
  ]
};
