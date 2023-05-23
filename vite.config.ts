import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          elementPlus: ["element-plus"],
        },
      },
    },
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    viteCompression(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
      filename: "stats.html",
    }),
  ],
});
