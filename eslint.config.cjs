/* eslint-disable */

const { configs } = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
);
