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
    minify: true,
  },
  preview: {
    allowedHosts: true, // Allows any host to access the preview server
  },
  server: {
    port: 3003,
    host: "0.0.0.0",
    strictPort: true,
  },
});
