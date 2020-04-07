module.exports = {
  env: {
    es6: true
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier", "react-hooks", "eslint-plugin-import-helpers"],
  rules: {
    "react/state-in-constructor": ["off", "never"],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".js"]
      }
    ],
    "no-console": ["error", { allow: ["tron"] }],
    "import/prefer-default-export": "off",
    "react/jsx-boolean-value": ["off"],
    "react/no-unused-state": ["off"],
    "no-param-reassign": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
