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

  {
    ignores: ['**/*skip*.js'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  pluginJs.configs.recommended,
  {
    name: 'rules/js',
    rules: {
      'no-debugger': 0,
      'no-empty': 1,
      'no-prototype-builtins': 0,
      'no-undef': 0,
      'no-unused-vars': 0,
    },
  },

  ...tseslint.configs.recommended,
  {
    name: 'rules/ts',
    rules: {
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'prefer-rest-params': 0,
    },
  },

  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    name: 'rules/vue',
    rules: {
      'vue/multi-word-component-names': 0,
    },
  },

  // prettier,
  // {
  //   name: 'rules/prettier',
  //   rules: {
  //     'prettier/prettier': 0,
  //   },
  // },
]
