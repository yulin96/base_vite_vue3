import { includeIgnoreFile } from '@eslint/compat'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import { Linter } from 'eslint'
import pluginVue from 'eslint-plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

configureVueProject({
  tsSyntaxInTemplates: false,
})

/** @type{Linter.Config[]} */
export default defineConfigWithVueTs(
  includeIgnoreFile(gitignorePath),

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,cjs,mts,jsx,tsx,vue}'],
    rules: {
      'no-debugger': 0,
      'no-empty': 1,
      'no-prototype-builtins': 0,
      'no-undef': 0,
      'no-unused-vars': 0,

      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'prefer-rest-params': 0,

      'vue/multi-word-component-names': 0,
    },
  },

  skipFormatting,
)
