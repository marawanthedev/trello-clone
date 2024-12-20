import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier"; // Import Prettier plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        { singleQuote: false, trailingComma: "all" },
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "out",
      "coverage",
      ".cache",
      ".git",
      ".github",
      ".vscode",
      ".idea",
      ".yarn",
      ".pnp",
    ],
  },
];
