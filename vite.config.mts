/// <reference types="vitest" />

import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { vitePluginVersionMark } from "vite-plugin-version-mark";
import version from "vite-plugin-package-version";

export default defineConfig(({ mode }) => ({
  build: {
    target: "esnext",
  },
  test: {
    css: false,
    include: ["src/**/__tests__/*", "src/**/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: "src/shared/config/tests/setupTests.ts",
    clearMocks: true,
    coverage: {
      provider: "istanbul",
      enabled: true,
      "100": true,
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    ...(mode === "test"
      ? []
      : [
          eslintPlugin(),
          VitePWA({
            strategies: "injectManifest",
            srcDir: "src",
            filename: "sw.ts",
            injectManifest: {
              swDest: "dist/sw.js",
            },
            registerType: "autoUpdate",
            includeAssets: [
              "favicon.png",
              "robots.txt",
              "apple-touch-icon.png",
              "icons/*.svg",
              "fonts/*.woff2",
              "assets/**/*",
            ],
            devOptions: {
              enabled: mode === "development",
            },
            manifest: {
              name: "Fasty - Delivery Exchange For Couriers",
              short_name: "Fasty",
              theme_color: "#000000",
              background_color: "#000000",
              shortcuts: [
                {
                  name: "Market",
                  icons: [
                    {
                      src: "/icons/actions/market-192x192.png",
                      sizes: "192x192",
                      type: "image/png",
                    },
                  ],
                  url: "/",
                },
                {
                  name: "My deliveries",
                  icons: [
                    {
                      src: "/icons/actions/deliveries-192x192.png",
                      sizes: "192x192",
                      type: "image/png",
                    },
                  ],
                  url: "/deliveries",
                },
                {
                  name: "History",
                  icons: [
                    {
                      src: "/icons/actions/history-192x192.png",
                      sizes: "192x192",
                      type: "image/png",
                    },
                  ],
                  url: "/history",
                },
                {
                  name: "Search",
                  icons: [
                    {
                      src: "/icons/actions/search-192x192.png",
                      sizes: "192x192",
                      type: "image/png",
                    },
                  ],
                  url: "/search",
                },
              ],
              icons: [
                {
                  src: "/android-chrome-48x48.png",
                  sizes: "48x48",
                  type: "image/png",
                  purpose: "any maskable",
                },
                {
                  src: "/android-chrome-72x72.png",
                  sizes: "72x72",
                  type: "image/png",
                  purpose: "any maskable",
                },
                {
                  src: "/android-chrome-96x96.png",
                  sizes: "96x96",
                  type: "image/png",
                  purpose: "any maskable",
                },
                {
                  src: "/android-chrome-144x144.png",
                  sizes: "144x144",
                  type: "image/png",
                  purpose: "any maskable",
                },
                {
                  src: "/android-chrome-192x192.png",
                  sizes: "192x192",
                  type: "image/png",
                  purpose: "any maskable",
                },
                {
                  src: "/android-chrome-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                },
              ],
              display: "standalone",
              orientation: "portrait",
              start_url: "/",
            },
            workbox: {
              globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
          }),
          vitePluginVersionMark({
            ifGitSHA: true,
            ifShortSHA: true,
            ifMeta: true,
            ifLog: true,
            ifGlobal: true,
          }),
          svgr(),
          version(),
        ]),
  ],
}));
