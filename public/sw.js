// Service Worker for Elghella - Agricultural Marketplace
const CACHE_NAME = 'elghella-v4';
const PRECACHE_URLS = [
  '/',
  '/assets/n7l1.webp',
  '/assets/n7l2.webp',
  'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@300;400;600;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  // Activate the new worker immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => Promise.resolve())
  );
});

self.addEventListener('activate', (event) => {
  // Take control of uncontrolled clients ASAP
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((name) => (name !== CACHE_NAME ? caches.delete(name) : Promise.resolve()))
      );
      await self.clients.claim();
    })()
  );
});

// Support manual skipWaiting from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore dev/local
  if (request.url.includes('localhost') || request.url.includes('127.0.0.1')) return;

  const isNavigation = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
  const isNextData = request.url.includes('/_next/data/');

  // For HTML and Next.js data JSON, always go to network without caching
  if (isNavigation || isNextData) {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() => caches.match(request))
    );
    return;
  }

  // Skip caching for non-GET requests (POST, PUT, DELETE, etc.)
  // Cache API only supports GET requests
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Skip caching for Supabase auth/API requests
  if (request.url.includes('supabase.co')) {
    event.respondWith(fetch(request));
    return;
  }

  // Default: network-first with cache fallback (GET requests only)
  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(request);
        const clone = fresh.clone();
        if (fresh.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, clone);
        }
        return fresh;
      } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw err;
      }
    })()
  );
});
