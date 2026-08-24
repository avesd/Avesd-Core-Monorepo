import { defineConfig } from "vitest/config";

export const createVitestConfig = () => defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html"],
    },
    passWithNoTests: false,
  },
});

