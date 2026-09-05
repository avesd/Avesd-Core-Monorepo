import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./styles.css";
import { startWorkbench } from "./workbench/runtime";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Renderer root element was not found");
}

const render = async (): Promise<void> => {
  await startWorkbench();

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

void render();
