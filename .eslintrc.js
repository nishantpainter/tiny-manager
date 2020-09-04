module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: [
    "react"
  ],
  parser:"@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
