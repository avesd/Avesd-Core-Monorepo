import { describe, expect, it, vi } from "vitest";

import { ContributionRegistry } from "./contribution-registry";
import { PluginHost } from "./plugin-host";

describe("PluginHost", () => {
  it("replaces a plugin and disposes its effects in reverse order", async () => {
    const events: string[] = [];
    const host = new PluginHost();

    await host.replace({
      activate(context) {
        context.effect(() => {
          events.push("first:activate");
          return () => {
            events.push("first:dispose-a");
          };
        });
        context.onDispose(() => {
          events.push("first:dispose-b");
        });
      },
      apiVersion: 1,
      id: "example",
      version: "1.0.0",
    });

    await host.replace({
      activate() {
        events.push("second:activate");
      },
      apiVersion: 1,
      id: "example",
      version: "2.0.0",
    });

    expect(events).toEqual([
      "first:activate",
      "second:activate",
      "first:dispose-b",
      "first:dispose-a",
    ]);
  });

  it("rolls back candidate effects when activation fails", async () => {
    const registry = new ContributionRegistry<string>();
    const host = new PluginHost();

    await host.replace({
      activate(context) {
        context.effect(() => registry.contribute("main", "stable"));
      },
      apiVersion: 1,
      id: "example",
      version: "1.0.0",
    });

    await expect(host.replace({
      activate(context) {
        context.effect(() => registry.contribute("main", "candidate"));
        throw new Error("activation failed");
      },
      apiVersion: 1,
      id: "example",
      version: "2.0.0",
    })).rejects.toThrow("activation failed");

    expect(registry.get("main")).toBe("stable");
    expect(host.activePluginIds).toEqual(["example"]);
  });

  it("notifies contribution subscribers when the active layer changes", () => {
    const listener = vi.fn();
    const registry = new ContributionRegistry<string>();
    registry.subscribe(listener);

    const removeFirst = registry.contribute("main", "first");
    const removeSecond = registry.contribute("main", "second");
    expect(registry.get("main")).toBe("second");

    removeSecond();
    expect(registry.get("main")).toBe("first");
    removeFirst();
    expect(listener).toHaveBeenCalledTimes(4);
  });
});
