import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const here = path.dirname(fileURLToPath(import.meta.url));
const museum = "http://127.0.0.1:8080";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../app",
    emptyOutDir: true,
  },
  server: {
    fs: {
      allow: [path.resolve(here, ".."), here],
    },
    port: 5173,
    strictPort: true,
    proxy: {
      "/years": museum,
      "/css": museum,
      "/js": museum,
      "/assets": museum,
      "/ui": museum,
      "/favicon.gif": museum,
    },
  },
});
