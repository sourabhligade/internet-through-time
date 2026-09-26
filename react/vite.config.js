import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const museum = "http://127.0.0.1:8080";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../app",
    emptyOutDir: true,
  },
  server: {
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
