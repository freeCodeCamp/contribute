// vp migrate: merged .oxlintrc.json (702dabe6418df17c0252fd833430fd27).
import { configDefaults, defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    globals: true,
    include: ['./tests/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude, '**/e2e/**']
  },
  fmt: {
    endOfLine: 'lf',
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    arrowParens: 'avoid',
    printWidth: 80,
    sortPackageJson: false,
    astro: true,
    associations: [{ files: ['**/*.svg'], language: 'html' }],
    ignorePatterns: [
      '**/node_modules',
      '**/dist',
      '**/.astro',
      '**/__coverage__',
      '.changeset',
      'pnpm-lock.yaml',
      'pre-commit'
    ]
  },
  lint: {
    plugins: ['typescript', 'oxc'],
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ],
    categories: {
      correctness: 'error'
    },
    options: {
      typeAware: true
    },
    ignorePatterns: [
      '.astro/',
      '.nimbus/',
      'dist/',
      '.cloudflare/',
      '.wrangler/',
      'test-results/',
      'playwright-report/',
      'blob-report/'
    ],
    rules: {
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          caughtErrors: 'all'
        }
      ],
      'vite-plus/prefer-vite-plus-imports': 'error'
    },
    overrides: [
      {
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'],
        rules: {
          'typescript/await-thenable': 'error',
          'typescript/ban-ts-comment': 'error',
          'no-array-constructor': 'error',
          'typescript/no-array-delete': 'error',
          'typescript/no-base-to-string': 'error',
          'typescript/no-duplicate-enum-values': 'error',
          'typescript/no-duplicate-type-constituents': 'error',
          'typescript/no-empty-object-type': 'error',
          'typescript/no-explicit-any': 'error',
          'typescript/no-extra-non-null-assertion': 'error',
          'typescript/no-floating-promises': 'error',
          'typescript/no-for-in-array': 'error',
          'typescript/no-implied-eval': 'error',
          'typescript/no-misused-new': 'error',
          'typescript/no-misused-promises': 'error',
          'typescript/no-namespace': 'error',
          'typescript/no-non-null-asserted-optional-chain': 'error',
          'typescript/no-redundant-type-constituents': 'error',
          'typescript/no-require-imports': 'error',
          'typescript/no-this-alias': 'error',
          'typescript/no-unnecessary-type-assertion': 'error',
          'typescript/no-unnecessary-type-constraint': 'error',
          'typescript/no-unsafe-argument': 'error',
          'typescript/no-unsafe-assignment': 'error',
          'typescript/no-unsafe-call': 'error',
          'typescript/no-unsafe-declaration-merging': 'error',
          'typescript/no-unsafe-enum-comparison': 'error',
          'typescript/no-unsafe-function-type': 'error',
          'typescript/no-unsafe-member-access': 'error',
          'typescript/no-unsafe-return': 'error',
          'typescript/no-unsafe-unary-minus': 'error',
          'no-unused-expressions': 'error',
          'no-unused-vars': [
            'error',
            {
              args: 'after-used',
              ignoreRestSiblings: false,
              caughtErrors: 'all',
              reportVarsOnlyUsedAsTypes: true
            }
          ],
          'typescript/no-wrapper-object-types': 'error',
          'typescript/only-throw-error': 'error',
          'typescript/prefer-as-const': 'error',
          'typescript/prefer-namespace-keyword': 'error',
          'typescript/prefer-promise-reject-errors': 'error',
          'typescript/require-await': 'error',
          'typescript/restrict-plus-operands': 'error',
          'typescript/restrict-template-expressions': 'error',
          'typescript/triple-slash-reference': 'error',
          'typescript/unbound-method': 'error'
        }
      },
      {
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
          'no-var': 'error',
          'prefer-const': 'error',
          'prefer-rest-params': 'error',
          'prefer-spread': 'error'
        }
      },
      {
        files: ['src/components/**/*.client.ts'],
        rules: {
          'typescript/no-misused-promises': [
            'error',
            {
              checksVoidReturn: {
                arguments: false,
                properties: false
              }
            }
          ]
        }
      },
      {
        files: ['src/components.ts'],
        rules: {
          'typescript/no-unsafe-assignment': 'off'
        }
      },
      {
        files: ['src/lib/variants.ts'],
        rules: {
          'no-unused-vars': [
            'error',
            {
              args: 'after-used',
              ignoreRestSiblings: true,
              caughtErrors: 'all',
              reportVarsOnlyUsedAsTypes: true
            }
          ]
        }
      },
      {
        files: ['src/layouts/BaseLayout.astro'],
        rules: {
          'no-unused-expressions': 'off'
        }
      }
    ]
  }
});
