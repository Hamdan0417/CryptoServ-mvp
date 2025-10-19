module.exports = {
  extends: ['next', '@crypto-serv/config/eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  }
};
