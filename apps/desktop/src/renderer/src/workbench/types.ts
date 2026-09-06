import { defineContributionPoint } from "@avesd/plugin-api";

export interface WorkbenchView {
  readonly mount: (container: HTMLElement) => () => void;
}

export const mainViewContribution = defineContributionPoint<WorkbenchView>(
  "workbench.main",
);
