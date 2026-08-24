export interface DesktopRuntime {
  readonly chrome: string;
  readonly electron: string;
  readonly node: string;
  readonly platform: string;
}

export interface DesktopApi {
  readonly runtime: DesktopRuntime;
}

export const formatRuntimeSummary = (runtime: DesktopRuntime): string =>
  `Electron ${runtime.electron} · ${runtime.platform}`;
