module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2],
    semi: [2, 'never'],
    camelcase: 2,
    'no-console': 0,
    'comma-dangle': [2, 'never'],
    'comma-spacing': [1, { before: false, after: true }],
    'computed-property-spacing': [1, 'always'],
    'import/extensions': ['off', 'never'],
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],
    "object-curly-spacing": ["error", "always"],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': ['error',
      {
        multiline: {
          delimiter: 'none'
        },
        singleline: {
          delimiter: 'comma'
        }
      }]
  }
}
