// Robot Aoi no Kokoro — minimal offline cache
const CACHE_NAME = 'aoi-kokoro-v1.0.0';
const ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/assets/favicon.webp',
  '/assets/logo-small.webp',
  '/assets/logo-full.webp',
  '/assets/aoi-hero.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const fresh = await fetch(event.request);
      if (fresh.ok && new URL(event.request.url).origin === self.location.origin) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, fresh.clone());
      }
      return fresh;
    } catch (error) {
      return caches.match('/index.html');
    }
  })());
});
