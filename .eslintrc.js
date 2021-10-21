module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
        'prettier/prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint'],
      rules: {
        semi: ['error', 'never'],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'no-plusplus': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 0,
        'no-use-before-define': 'off',
        'react/jsx-props-no-spreading': 0,
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'import/no-unresolved': 'warn',
        'react/require-default-props': [
          1,
          { forbidDefaultForRequired: false, ignoreFunctionalComponents: true },
        ],
        'react/jsx-no-bind': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-var-requires': 0,
        // ? typescript has a false-positive:
        // ? https://github.com/typescript-eslint/typescript-eslint/issues/2483
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
      },
    },
  ],
}
