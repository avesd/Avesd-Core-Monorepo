import type { ContributionRegistry } from "@avesd/kernel";
import type { PluginDefinition } from "@avesd/plugin-api";

import type { WorkbenchView } from "../workbench/types";

const welcomeView: WorkbenchView = {
  mount(container) {
    const section = document.createElement("section");
    section.className = "hero";

    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "LOCAL-FIRST AI WORKBENCH";

    const title = document.createElement("h1");
    title.textContent = "Your workspace, rewritten live.";

    const intro = document.createElement("p");
    intro.className = "intro";
    intro.textContent = "Avesd now renders its main surface through a replaceable plugin. Edit this plugin during development and the workbench swaps it without restarting Electron.";

    const runtime = document.createElement("p");
    runtime.className = "runtime";
    runtime.textContent = `Electron ${window.avesd.runtime.electron} · ${window.avesd.runtime.platform}`;

    section.append(eyebrow, title, intro, runtime);
    container.replaceChildren(section);

    return () => section.remove();
  },
};

export const createWelcomePlugin = (
  views: ContributionRegistry<WorkbenchView>,
): PluginDefinition => ({
  activate(context) {
    context.effect(() => views.contribute("workbench.main", welcomeView));
  },
  apiVersion: 1,
  id: "avesd.builtin.welcome",
  version: "0.1.0",
});
