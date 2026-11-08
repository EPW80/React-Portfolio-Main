import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { portfolioSeoPlugin } from "./src/seo/plugin.js";

export default defineConfig({
  plugins: [react(), portfolioSeoPlugin()],
  base: "/",
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
