import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "RateCooWidget",
      fileName: "widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "widget.js",
      },
    },
    minify: "terser",
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
