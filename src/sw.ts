/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

// Add specific page URLs to precache list
const additionalPrecaches = [
    { url: '/deliveries', revision: null },
    { url: '/history', revision: null },
    { url: '/search', revision: null },
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
