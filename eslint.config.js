import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['**/dist', '**/node_modules', '**/*.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // React rules (only apply to .tsx files)
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['packages/client/src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './packages/client/tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettierConfig
);
