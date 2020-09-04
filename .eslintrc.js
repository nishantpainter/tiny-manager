module.exports = {
  env: {
    browser: true,
    commonjs: true,
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
  },
  settings:{
    react:{
      version: "detect"
    }
  }
}
