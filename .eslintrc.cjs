/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx']
      }
    }
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-refresh', 'unicorn', 'jsx-a11y'],
  ignorePatterns: [
    '.eslintrc.cjs',
    'node_modules/',
    'build/',
    '.prettierrc',
    'api/json-server.js',
    'api/express-multer.js'
  ],
  rules: {
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-ternary': ['warn', 'only-single-line'],
    checkArrowFunctions: 'off',
    'unicorn/no-null': ['off', { checkStrictEquality: true }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true
        }
      }
    ],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/prefer-default-export': 'off',
    'unicorn/prefer-query-selector': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/require-await': 'off',
    'no-param-reassign': ['error', { props: false }]
  }
};
