/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

void self.skipWaiting();

// cache navigations
const navigationRoute = new NavigationRoute(
    new NetworkFirst({
        cacheName: 'navigation',
        networkTimeoutSeconds: 3,
    }),
);
registerRoute(navigationRoute);
