import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    lib: {
      entry: "src/Widget.tsx",
      name: "IAChatWidget",
      fileName: () => "widget.js",
      formats: ["iife"],
    },
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
    minify: "terser",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
