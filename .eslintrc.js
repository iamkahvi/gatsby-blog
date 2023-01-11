module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    `google`,
    `eslint:recommended`,
    `plugin:react/recommended`,
    `prettier`,
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "require-jsdoc": 0,
  },
};
