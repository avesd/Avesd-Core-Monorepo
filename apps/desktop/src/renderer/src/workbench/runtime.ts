import { ContributionRegistry, PluginHost } from "@avesd/kernel";

import { createWelcomePlugin } from "../plugins/welcome-plugin";
import type { WorkbenchView } from "./types";

export const mainViewKey = "workbench.main";
export const mainViewRegistry = new ContributionRegistry<WorkbenchView>();
export const pluginHost = new PluginHost();

export const startWorkbench = async (): Promise<void> => {
  await pluginHost.replace(createWelcomePlugin(mainViewRegistry));
};

if (import.meta.hot) {
  import.meta.hot.accept("../plugins/welcome-plugin", (module) => {
    if (module) {
      void pluginHost.replace(module.createWelcomePlugin(mainViewRegistry));
    }
  });

  import.meta.hot.dispose(() => {
    void pluginHost.dispose();
  });
}
