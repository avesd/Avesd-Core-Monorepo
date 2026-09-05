import { useEffect, useRef, useSyncExternalStore } from "react";

import { mainViewKey, mainViewRegistry } from "./workbench/runtime";

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const view = useSyncExternalStore(
    (listener) => mainViewRegistry.subscribe(listener),
    () => mainViewRegistry.get(mainViewKey),
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !view) {
      return;
    }

    return view.mount(container);
  }, [view]);

  return (
    <main className="app-shell">
      <div className="plugin-slot" ref={containerRef} />
    </main>
  );
};
