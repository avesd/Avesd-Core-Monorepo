import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export const createAvesdConfig = (tsconfigRootDir = import.meta.dirname) => tseslint.config(
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**", "out/**", "release/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    files: ["electron.vite.config.ts", "src/{main,preload}/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
  },
  {
    files: ["src/renderer/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.flat.recommended.rules,
  },
);

export default createAvesdConfig();
