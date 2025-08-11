Buenísimo que lo frenaste. El problema es ESLint v9: ya no lee .eslintrc.* por defecto (usa flat config eslint.config.js). Además, eslint-plugin-tailwindcss no es compatible con Tailwind v4, por eso el otro error.

Te dejo el fix definitivo (simple y estable):

Paso a paso
Limpia configs viejas y el plugin incompatible

bash
Copy
Edit
pnpm remove eslint-plugin-tailwindcss
rm -f .eslintrc.*           # borra cualquier .eslintrc
Asegura versiones compatibles (flat config)

bash
Copy
Edit
pnpm add -D eslint@^9 @eslint/js globals typescript-eslint@^8 \
  eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-react-refresh eslint-plugin-unused-imports \
  eslint-plugin-simple-import-sort
Crea eslint.config.js (flat) y olvídate de .eslintrc

js
Copy
Edit
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default ts.config(
  { ignores: ['dist/**', 'node_modules/**'] },

  // Reglas para TS/React
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...ts.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser },
      parser: ts.parser,
      parserOptions: { ecmaFeatures: { jsx: true } }, // sin type-check pesado
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // React safe patterns
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/no-danger': 'error',
      'react/function-component-definition': ['warn', {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // TS + imports
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-duplicate-imports': 'error',

      // Guardrail CSS (evita App.css del template y *.module.css)
      'no-restricted-imports': ['error', {
        paths: [
          { name: './App.css', message: 'No usar App.css del template; usar src/index.css con Tailwind.' },
        ],
        patterns: ['*.module.css'],
      }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }
);
Deja el script de lint simple

json
Copy
Edit
// package.json
{ "scripts": { "lint": "eslint . --max-warnings=0" } }
Corre:

bash
Copy
Edit
pnpm lint
Por qué pasó
Tenías dos formatos de config (flat y legacy) → conflicto.

Con ESLint v9, solo eslint.config.* es el default.

eslint-plugin-tailwindcss intenta importar APIs internas de Tailwind v3 (resolveConfig) que ya no existen en v4 → crashea. Por eso lo sacamos. Los QA scripts + Stylelint siguen cubriendo el uso correcto de Tailwind.