const CACHE_NAME = "study-garage-v1";
const BASE_PATH = "/study-garage/";
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}favicon-16x16.png`,
  `${BASE_PATH}favicon-32x32.png`,
  `${BASE_PATH}pwa-192x192.png`,
  `${BASE_PATH}pwa-512x512.png`,
  `${BASE_PATH}Study-Garage-Logo.jpg`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(BASE_PATH));
    })
  );
});
