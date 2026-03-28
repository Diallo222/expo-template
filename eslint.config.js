const expo = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  ...expo,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);
