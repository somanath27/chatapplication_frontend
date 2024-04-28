import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: '^18.2.0'
      }
    }
  },
  {
    rules: {
      'no-undef': 'off' // Turn off no-undef rule
    }
  }
];
