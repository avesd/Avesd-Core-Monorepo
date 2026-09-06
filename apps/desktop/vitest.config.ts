import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html"],
    },
    passWithNoTests: false,
    projects: [
      {
        test: {
          environment: "node",
          exclude: ["src/**/*.browser.test.ts"],
          include: ["src/**/*.test.ts"],
          name: "unit",
        },
      },
      {
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright(),
          },
          include: ["src/**/*.browser.test.ts"],
          name: "browser",
        },
      },
    ],
  },
});
