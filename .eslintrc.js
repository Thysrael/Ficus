module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    // 启用eslint推荐的规则
    'eslint:recommended',
    // typescript-eslint插件的检验规则
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
  }
}
