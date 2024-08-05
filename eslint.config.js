import { includeIgnoreFile } from '@eslint/compat'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  pluginJs.configs.recommended,
  {
    rules: {
      'no-undef': 0,
      'no-empty': 1,
      'no-debugger': 0,
      'no-extra-semi': 0,
      'no-unused-vars': 0,
      'no-prototype-builtins': 0,
    },
  },

  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-extra-semi': 0,
      'prefer-rest-params': 0,
      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowDestructuring: false,
          allowedNames: ['self', 'THAT', '_this'],
        },
      ],
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-unused-expressions': 0,
    },
  },

  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/multi-word-component-names': 0,
    },
  },
]
