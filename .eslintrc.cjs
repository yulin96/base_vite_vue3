module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    'prefer-rest-params': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false,
        allowedNames: ['self', 'THAT', '_this'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    'no-undef': 0,
    'no-debugger': 0,
    'no-extra-semi': 0,
    'no-unused-vars': 0,
    'no-prototype-builtins': 0,
  },
}
