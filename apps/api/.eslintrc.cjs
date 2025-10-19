module.exports = {
  extends: ['@crypto-serv/config/eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  ignorePatterns: ['dist', 'node_modules']
};
