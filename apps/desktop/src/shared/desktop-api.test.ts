import { describe, expect, it } from "vitest";

import { formatRuntimeSummary } from "./desktop-api";

describe("formatRuntimeSummary", () => {
  it("formats the Electron version and platform", () => {
    expect(formatRuntimeSummary({
      chrome: "136.0.0",
      electron: "43.4.1",
      node: "24.11.1",
      platform: "darwin",
    })).toBe("Electron 43.4.1 · darwin");
  });
});

