import { contextBridge } from "electron";

import type { DesktopApi } from "../shared/desktop-api";

const desktopApi: DesktopApi = Object.freeze({
  runtime: Object.freeze({
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
    platform: process.platform,
  }),
});

contextBridge.exposeInMainWorld("avesd", desktopApi);

