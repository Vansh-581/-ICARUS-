/**
 * ICARUS Service Worker
 * Strategy:
 *  - GLB model + fonts → Cache-First (never re-download after first visit)
 *  - Team photos (/team/*) → Cache-First (once uploaded they're stable)
 *  - Everything else → Network-first (HTML, JS, API calls stay fresh)
 */

const CACHE_NAME = 'icarus-assets-v1';

const PRECACHE = [
  '/Icarus_model_3d.glb',
  // Add team photo paths here once uploaded, e.g.:
  // '/team/arjun-mehta.jpg',
];

// ── Install: pre-cache critical heavy assets ──────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()) // activate immediately
      .catch(() => self.skipWaiting()) // don't block install if preload fails
  );
});

// ── Activate: delete stale caches, claim all clients ─────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for heavy static assets ────────────────
self.addEventListener('fetch', (event) => {
  const { url, method } = event.request;

  // Only handle GET requests
  if (method !== 'GET') return;

  const isCacheFirst =
    url.endsWith('.glb') ||
    url.includes('fonts.gstatic.com') ||  // Google Font files
    url.includes('/team/') ||              // team photos (when uploaded)
    url.match(/\.(woff2?|ttf|otf)$/);     // any local fonts

  if (isCacheFirst) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached; // instant: served from disk

        // Not cached yet — fetch, clone into cache, return
        return fetch(event.request).then((response) => {
          if (!response || !response.ok) return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        }).catch(() => cached); // if offline and somehow not cached, return nothing
      })
    );
  }
  // All other requests (HTML, JS bundles, API) → default browser behaviour
});
