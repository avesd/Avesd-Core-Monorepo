export type Dispose = () => void | Promise<void>;

export interface PluginContext {
  readonly pluginId: string;
  effect(setup: () => Dispose): void;
  onDispose(dispose: Dispose): void;
}

export interface PluginDefinition {
  readonly apiVersion: 1;
  readonly id: string;
  readonly version: string;
  activate(context: PluginContext): Dispose | Promise<Dispose | void> | void;
}

export interface PluginManifest {
  readonly apiVersion: 1;
  readonly capabilities?: readonly string[];
  readonly displayName: string;
  readonly id: string;
  readonly main?: string;
  readonly ui?: string;
  readonly version: string;
}
