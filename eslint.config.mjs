import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default ts.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**'],
  },

  js.configs.recommended,
  ...ts.configs.recommended,

  // eslint-plugin-astro's recommended set understands .astro component syntax
  // and adds the accessibility rules that matter for our markup.
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Islands read `document`/`window` and attach listeners; unused vars are
      // still worth catching, but an underscore prefix marks a deliberate one.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
