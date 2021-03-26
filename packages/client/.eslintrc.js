// eslint-disable-next-line no-undef
module.exports = {
  settings: {
    react: {
      version: "detect",
    }
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  extends: [
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    }
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_"
    }],
    "arrow-body-style": "off",
    "class-methods-use-this": "off",
    "default-case": "off",
    "import/prefer-default-export": "off",
    "max-len": ["error", { "code": 100 }],
    "no-param-reassign": ["error", {
      "props": true,
      "ignorePropertyModificationsFor": ["state"]
      }
    ],
    "no-plusplus": "off",
    "react/display-name": "off",
    "react/jsx-key": ["off", {}],
    "react/no-unused-prop-types": ["off", {}],
    "react/prop-types": ["off", {}],
    "react/require-default-props": ["off", {}]
  },
}
