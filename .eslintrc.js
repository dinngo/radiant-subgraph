module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/ban-types': 'off',
  },
};
