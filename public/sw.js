const CACHE = 'tayanch-v1';
const BASE = self.location.pathname.replace(/[^/]*$/, '');

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        BASE,
        BASE + 'assets/interactive.css',
        BASE + 'manifest.json',
        BASE + 'pwa-192.png',
        BASE + 'pwa-512.png',
        BASE + 'favicon.svg'
      ])
    ).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok && event.request.url.indexOf(self.location.origin) === 0) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') return caches.match(BASE);
          return cached;
        });
      return cached || network;
    })
  );
});