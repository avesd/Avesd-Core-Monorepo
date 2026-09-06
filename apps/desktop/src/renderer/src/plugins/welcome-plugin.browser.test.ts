import {
  ContributionBroker,
  ContributionRegistry,
  PluginHost,
} from "@avesd/kernel";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";

import { mainViewContribution } from "../workbench/types";
import type { WorkbenchView } from "../workbench/types";
import { welcomePlugin } from "./welcome-plugin";

describe("welcome UI plugin", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("mounts in a real browser and cleans up its DOM", async () => {
    Object.defineProperty(window, "avesd", {
      configurable: true,
      value: {
        runtime: {
          chrome: "test",
          electron: "test",
          node: "test",
          platform: "browser",
        },
      },
    });

    const views = new ContributionRegistry<WorkbenchView>();
    const contributions = new ContributionBroker();
    contributions.register(mainViewContribution, views);
    const host = new PluginHost({ contributions });
    await host.replace(welcomePlugin);

    const view = views.get(mainViewContribution.id);
    expect(view).toBeDefined();

    const container = document.createElement("div");
    document.body.append(container);
    const disposeView = view?.mount(container);

    await expect.element(page.getByRole("heading", {
      name: "Your workspace, rewritten live.",
    })).toBeVisible();

    disposeView?.();
    expect(container.childElementCount).toBe(0);

    await host.remove("avesd.builtin.welcome");
    expect(views.get(mainViewContribution.id)).toBeUndefined();
  });
});
