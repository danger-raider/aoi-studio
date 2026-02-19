// sw.js — Aoi Studio (offline-first, safe minimal)
const CACHE_NAME = 'aoi-studio-v0.1';
const ASSETS = [
  './',
  './index.html',
  './sw.js',
  // add these if you create them:
  './assets/aoi-japan.webp',
  // './assets/icon-192.png',
  // './assets/icon-512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

// Cache-first: fast + offline
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only GET
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    const fresh = await fetch(req);
    // cache same-origin basic responses
    if (fresh && fresh.ok && fresh.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone());
    }
    return fresh;
  })());
});
