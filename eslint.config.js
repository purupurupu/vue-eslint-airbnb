import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tseslintParser from '@typescript-eslint/parser'
import vueEslintParser from 'vue-eslint-parser'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginImport from 'eslint-plugin-import'
import airbnbBase from 'eslint-config-airbnb-base'
import globals from 'globals'

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: eslintPluginVue,
      import: eslintPluginImport
    },
    settings: {
      ...airbnbBase.settings,
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        }
      }
    },
    rules: {
      ...airbnbBase.rules,
      ...tseslint.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          vue: 'never'
        }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: eslintPluginVue
    },
    rules: {
      ...eslintPluginVue.configs['vue3-recommended'].rules
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tseslintParser
      }
    }
  }
]
