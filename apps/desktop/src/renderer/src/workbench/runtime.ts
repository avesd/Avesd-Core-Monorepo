import {
  ContributionBroker,
  ContributionRegistry,
  PluginHost,
} from "@avesd/kernel";

import { welcomePlugin } from "../plugins/welcome-plugin";
import { mainViewContribution } from "./types";
import type { WorkbenchView } from "./types";

export const mainViewRegistry = new ContributionRegistry<WorkbenchView>();
const contributions = new ContributionBroker();
contributions.register(mainViewContribution, mainViewRegistry);
export const pluginHost = new PluginHost({ contributions });

export const startWorkbench = async (): Promise<void> => {
  await pluginHost.replace(welcomePlugin);
};

if (import.meta.hot) {
  import.meta.hot.accept("../plugins/welcome-plugin", (module) => {
    if (module) {
      void pluginHost.replace(module.welcomePlugin);
    }
  });

  import.meta.hot.dispose(() => {
    void pluginHost.dispose();
  });
}
