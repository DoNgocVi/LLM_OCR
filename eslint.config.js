import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser';
console.log(eslintConfigPrettier.rules, 'eslintConfigPrettier.rules')
export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      ...eslintConfigPrettier.rules,
      'vue/multi-word-component-names': 'off',
      "prefer-const": "error",
      'prettier/prettier': 'error'
    },
    ignores: ["**/temp.js", "config/*", 'node_modules']
  },
];