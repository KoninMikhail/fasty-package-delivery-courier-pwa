import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

// Add specific page URLs to precache list
const additionalPrecaches = [
    { url: '/deliveries', revision: null },
    { url: '/history', revision: null },
    { url: '/search', revision: null },
    { url: '/profile', revision: null },
    { url: '/settings', revision: null },
];

// Retrieve existing manifest from self.__WB_MANIFEST
const manifestToPrecache = [...self.__WB_MANIFEST, ...additionalPrecaches];

// Precache static assets and additional page URLs
precacheAndRoute(manifestToPrecache);

void self.skipWaiting();

// cache navigations
const navigationRoute = new NavigationRoute(
    new NetworkFirst({
        cacheName: 'navigation',
        networkTimeoutSeconds: 3,
    }),
);
registerRoute(navigationRoute);

// Cache uploaded files with NetworkFirst strategy
registerRoute(
    /.*\/uploads\/.*/i,
    new NetworkFirst({
        cacheName: 'files-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

// Cache subway icons with CacheFirst strategy
registerRoute(
    /.*\/icons\/subway\/.+svg/i,
    new CacheFirst({
        cacheName: 'subway-icons-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);
