import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    },
  },
]);
