module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [require.resolve('@crypto-serv/config/eslint')],
  ignorePatterns: ['dist/**']
};
