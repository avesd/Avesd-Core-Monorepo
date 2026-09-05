export interface WorkbenchView {
  readonly mount: (container: HTMLElement) => () => void;
}
