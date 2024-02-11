/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COURIERS_API_BASE_URL: string
    readonly VITE_JWT_TOKEN_COOKIE_KEY: string
    readonly VITE_AUTH_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}