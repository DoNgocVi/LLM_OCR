import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import pinia from 'eslint-plugin-pinia'
import vueEslintParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
// console.log(eslintConfigPrettier.rules, 'eslintConfigPrettier.rules')
export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: tsParser,
      },
    },
    plugins: {
      vue,
      pinia,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'prefer-const': 'error',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['warn'], // Cảnh báo khi có biến không sử dụng
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Tắt bắt buộc kiểu trả về
      '@typescript-eslint/no-explicit-any': 'warn', // Cảnh báo khi sử dụng `any`
      '@typescript-eslint/no-inferrable-types': 'warn', // Tắt khai báo kiểu rõ ràng khi TypeScript có thể suy ra
      ...eslintConfigPrettier.rules,
    },
    ignores: ['**/temp.js', 'config/*', 'node_modules', 'dist', '*.config.js'],
  },
]
