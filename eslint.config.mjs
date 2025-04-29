import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base ESLint recommended config (JavaScript)
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
  },

  // TypeScript support
  ...tseslint.configs.recommended,

  // Global variables configuration
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node, // Adds Node.js globals (process, require, etc.)
        ...globals.browser, // Optional: Include if you also have browser code
      },
    },
  },

  // Project-specific rules (customize as needed)
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // Make unused vars a warning instead of an error
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }, // Ignore vars prefixed with _
      ],
      "no-undef": "error", // Ensure variables are defined
    },
  },
]);
