// Service Worker — Sesión Horarios
// Estrategia:
//  - Navegación (HTML): network-first con fallback a cache.
//  - Otros recursos same-origin (CSS/JS/iconos): stale-while-revalidate
//    (sirve de cache rápido y actualiza en background).
//  - Cross-origin: passthrough (no cacheamos CDNs por simplicidad).

const CACHE_VERSION = 'v21';
const CACHE_NAME = `sesion-horarios-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
  '.',
  'index.html',
  'styles.css?v=2.0.0',
  'app.js?v=2.0.0',
  'tz-utils.js?v=2.0.0',
  'manifest.webmanifest',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => cache.addAll(ASSETS_TO_CACHE).catch(err => console.warn('SW pre-cache parcial:', err)))
              .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
              .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
              .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // Cross-origin: dejamos pasar al navegador (CDN de FontAwesome, Google Fonts, etc.)
    if (url.origin !== self.location.origin) return;

    // Navegación HTML: network-first con fallback offline
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then(res => {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match('index.html'))
        );
        return;
    }

    // Otros assets same-origin: stale-while-revalidate
    event.respondWith(
        caches.match(req).then(cached => {
            const fetchPromise = fetch(req).then(networkRes => {
                if (networkRes && networkRes.ok) {
                    const copy = networkRes.clone();
                    caches.open(CACHE_NAME).then(c => c.put(req, copy));
                }
                return networkRes;
            }).catch(() => cached);
            return cached || fetchPromise;
        })
    );
});

// Permite que la página fuerce skipWaiting tras detectar una update
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
