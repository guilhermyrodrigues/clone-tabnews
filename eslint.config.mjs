import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import next from "@next/eslint-plugin-next";
import globals from "globals";

export default [
  {
    ignores: [".next/**", "node_modules/**", "coverage/**", "dist/**"],
  },

  js.configs.recommended,

  {
    files: ["pages/**/*.{js,jsx}"],
    plugins: {
      "@next/next": next,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },

  {
    files: ["pages/api/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["infra/**/*.js", "jest.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["infra/migrations/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },

  {
    files: ["tests/**/*.js"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        fetch: "readonly",
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];
