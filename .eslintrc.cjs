module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 0,
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
    'no-undef': 0,
    'no-debugger': 0,
    'no-extra-semi': 0,
    'no-unused-vars': 0,
    'no-prototype-builtins': 0,
  },
}
