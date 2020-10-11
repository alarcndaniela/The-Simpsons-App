const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html", "/images/homero.png"];

const self = this;

// Install SW
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log("Opened cache");

      cache.addAll([
        "/index.html",
        "/offline.html",
        "/images/homero.png"]);
    })
  );
  return self.clients.claim();
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("/offline.html", "/images/homero.png"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
