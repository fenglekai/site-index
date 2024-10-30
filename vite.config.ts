import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

const pathSrc = path.resolve(__dirname, "src");
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
    viteCompression(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      filename: "./node_modules/.cache/visualizer/stats.html",
    }),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],

      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, "components.d.ts"),
      directoryAsNamespace: true,
    }),

    Icons({
      autoInstall: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["**/*.{png,svg,jpg,mp4,webp,hdr,ply,bin,gltf,glb}", "src/assets/**/*"],
      manifest: {
        name: "KAISite",
        short_name: "KAISite",
        start_url: ".",
        display: "standalone",
        background_color: "#fff",
        description: "A readable Hacker News app.",
        icons: [
          {
            src: "favicon.ico",
            sizes: "128x128",
          },
          {
            src: "logo.png",
            sizes: "192x192",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|gif|mp4|webm|svg|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "media-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
