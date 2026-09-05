export interface AcpTransport {
  notify(method: string, params: unknown): void;
  onNotification(listener: (method: string, params: unknown) => void): () => void;
  request<TResult>(method: string, params: unknown): Promise<TResult>;
}

export interface AcpClientCapabilities {
  readonly fs?: {
    readonly readTextFile?: boolean;
    readonly writeTextFile?: boolean;
  };
  readonly terminal?: boolean;
}

export interface AcpAgentCapabilities {
  readonly loadSession?: boolean;
  readonly promptCapabilities?: {
    readonly audio?: boolean;
    readonly embeddedContext?: boolean;
    readonly image?: boolean;
  };
}

export interface AcpInitializeResult {
  readonly agentCapabilities: AcpAgentCapabilities;
  readonly agentInfo?: {
    readonly name: string;
    readonly title?: string;
    readonly version: string;
  };
  readonly authMethods?: readonly unknown[];
  readonly protocolVersion: number;
}

export type AcpContentBlock =
  | { readonly text: string; readonly type: "text" }
  | { readonly name: string; readonly type: "resource_link"; readonly uri: string };

export interface AcpSessionUpdate {
  readonly sessionId: string;
  readonly update: unknown;
}

export class AcpClient {
  constructor(private readonly transport: AcpTransport) {}

  initialize(clientInfo: { readonly name: string; readonly title?: string; readonly version: string }, clientCapabilities: AcpClientCapabilities): Promise<AcpInitializeResult> {
    return this.transport.request("initialize", {
      clientCapabilities,
      clientInfo,
      protocolVersion: 1,
    });
  }

  newSession(cwd: string): Promise<{ readonly sessionId: string }> {
    return this.transport.request("session/new", { cwd, mcpServers: [] });
  }

  loadSession(sessionId: string, cwd: string): Promise<void> {
    return this.transport.request("session/load", { cwd, mcpServers: [], sessionId });
  }

  prompt(sessionId: string, prompt: readonly AcpContentBlock[]): Promise<{ readonly stopReason: string }> {
    return this.transport.request("session/prompt", { prompt, sessionId });
  }

  cancel(sessionId: string): void {
    this.transport.notify("session/cancel", { sessionId });
  }

  onSessionUpdate(listener: (update: AcpSessionUpdate) => void): () => void {
    return this.transport.onNotification((method, params) => {
      if (method === "session/update") {
        listener(params as AcpSessionUpdate);
      }
    });
  }
}
