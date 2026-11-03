import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves under /react-portfolio-master/; Vercel serves at domain root.
const base = process.env.VERCEL ? "/" : "/react-portfolio-master/";

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
