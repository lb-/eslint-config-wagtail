import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/node_modules/']),
  {
    extends: compat.extends('./index.js'),
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 9,
      sourceType: 'commonjs',
    },
    rules: {},
    settings: {
      // Manually set the version to disable automated detection of the "react" dependency.
      react: { version: '999.999.999' },
    },
  },
]);
