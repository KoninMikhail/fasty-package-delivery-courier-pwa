/// <reference types="vitest" />

import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import {VitePWA} from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import {vitePluginVersionMark} from "vite-plugin-version-mark";
import version from "vite-plugin-package-version";

export default defineConfig(({mode}) => ({
    build: {
        target: 'esnext',
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
        exclude: ['js-big-decimal']
    },
    server: {
        proxy: {
            "/api/users/me": "/api/me",
        }
    },
    plugins: [
        tsconfigPaths(),
        react(),
        ...(mode === "test"
            ? []
            : [
                eslintPlugin(),
                VitePWA({
                    registerType: "autoUpdate",
                    includeAssets: [
                        "favicon.png",
                        "robots.txt",
                        "apple-touch-icon.png",
                        "icons/*.svg",
                        "fonts/*.woff2",
                        "assets/**/*",
                    ],
                    manifest: {
                        name: "Fasty - Delivery Exchange For Couriers",
                        short_name: "Fasty",
                        theme_color: "#11181c",
                        background_color: "#11181c",
                        icons: [
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
                    },
                    workbox: {
                        runtimeCaching: [
                            {
                                urlPattern: /^https:\/\/crm-api\.a1stage\.ru\/files\/.*/i,
                                handler: 'CacheFirst',
                                options: {
                                    cacheName: 'avatar-cache',
                                    expiration: {
                                        maxEntries: 10,
                                        maxAgeSeconds: 60 * 60 * 24 // <== 1 day
                                    },
                                    cacheableResponse: {
                                        statuses: [0, 200]
                                    }
                                }
                            }]
                    }
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
