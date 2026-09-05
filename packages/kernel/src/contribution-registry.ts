import type { Dispose } from "@avesd/plugin-api";

type Listener = () => void;

interface Contribution<T> {
  readonly token: symbol;
  readonly value: T;
}

export class ContributionRegistry<T> {
  readonly #contributions = new Map<string, Contribution<T>[]>();
  readonly #listeners = new Set<Listener>();

  contribute(key: string, value: T): Dispose {
    const contribution = { token: Symbol(key), value };
    const entries = this.#contributions.get(key) ?? [];
    entries.push(contribution);
    this.#contributions.set(key, entries);
    this.#emit();

    return () => {
      const currentEntries = this.#contributions.get(key);
      const index = currentEntries?.findIndex(({ token }) => token === contribution.token) ?? -1;

      if (!currentEntries || index < 0) {
        return;
      }

      currentEntries.splice(index, 1);
      if (currentEntries.length === 0) {
        this.#contributions.delete(key);
      }
      this.#emit();
    };
  }

  get(key: string): T | undefined {
    return this.#contributions.get(key)?.at(-1)?.value;
  }

  keys(): readonly string[] {
    return [...this.#contributions.keys()];
  }

  subscribe(listener: Listener): Dispose {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #emit(): void {
    for (const listener of this.#listeners) {
      listener();
    }
  }
}
