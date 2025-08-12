// sw.js — basic PWA with offline fallback and asset caching

const CACHE_VERSION = "v1.0.0";
const RUNTIME = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "/pages/offline.html";

// Add key pages & assets you want to pre-cache
const PRECACHE = [
  "/", "/index.html",
  "/projects.html",
  "/pages/about.html", "/pages/contact.html", "/pages/blog.html", "/pages/cv.html", "/pages/search.html",
  "/projects/k3s-portfolio.html", "/projects/home-assistant-dashboard.html", "/projects/pi-ids.html", "/projects/vpn-ddns.html",
  "/assets/css/styles.css",
  "/assets/js/layout.js", "/assets/js/main.js",
  "/assets/js/projects-filter.js", "/assets/js/blog.js", "/assets/js/search.js",
  OFFLINE_URL
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(RUNTIME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== RUNTIME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategy:
// - Navigation requests: Network first, fallback to offline page.
// - Same-origin static assets: Stale-while-revalidate.
// - Everything else: Try cache then network.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET
  if (request.method !== "GET") return;

  // Navigation (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const net = await fetch(request);
        // Cache a copy in background
        const cache = await caches.open(RUNTIME);
        cache.put(request, net.clone());
        return net;
      } catch {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(request);
        return cached || cache.match(OFFLINE_URL);
      }
    })());
    return;
  }

  // Same-origin static files: stale-while-revalidate
  if (url.origin === location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then((res) => {
        if (res && res.status === 200) cache.put(request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })());
    return;
  }

  // Third-party: cache-first as a safe default
  event.respondWith(
    caches.match(request).then(resp => resp || fetch(request))
  );
});
