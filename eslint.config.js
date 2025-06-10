import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // Para desabilitar regras do ESLint que conflitam com o Prettier

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Desabilita regras do ESLint que podem conflitar com o Prettier
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser, // browser: true
      parser: tseslint.parser, // Equivalente a '@typescript-eslint/parser'
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      '@typescript-eslint': tseslint.plugin, // Adiciona o plugin do TypeScript
    },
    settings: {
      react: {
        version: 'detect', // Equivalente a settings.react.version
      },
    },
    rules: {
      // Regras de React
      ...react.configs.recommended.rules, // Equivalente a 'plugin:react/recommended'
      ...reactHooks.configs.recommended.rules, // Equivalente a 'plugin:react-hooks/recommended'
      'react/react-in-jsx-scope': 'off', // 'react/react-in-jsx-scope': 'off',

      // Regras de TypeScript
      '@typescript-eslint/explicit-module-boundary-types': 'off', // '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // '@typescript-eslint/no-explicit-any': 'off',

      // Regras de React Refresh (para Vite)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Regras do Prettier
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
