module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@coxy/eslint-config/next', 'plugin:prettier/recommended'],
  rules: {
    'react-hooks/exhaustive-deps': [0],
    'comma-dangle': ['error', 'always-multiline'],
    'react/display-name': 'off',
  },
}
