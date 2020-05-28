const CACHE_NAME = "site-static-v3";
const urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./team.html",
  "./manifest.json",
  "./pages/home.html",
  "./pages/my-favorites.html",
  "./js/materialize.min.js",
  "./dist/bundle.js",
  "./js/idb.js",
  "./js/template.js",
  "./assets/bg.jpg",
  "./assets/no-image.png",
  "./assets/icons/icon-128x128.png",
  "./assets/icons/icon-144x144.png",
  "./assets/icons/icon-152x152.png",
  "./assets/icons/icon-192x192.png",
  "./assets/icons/icon-384x384.png",
  "./assets/icons/icon-512x512.png",
  "./assets/icons/icon-72x72.png",
  "./assets/icons/icon-96x96.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  const base_url = "https://api.football-data.org/v2/";
  if (e.request.url.indexOf(base_url) > -1) {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(e.request).then((res) => {
          cache.put(e.request.url, res.clone());
          return res;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then((res) => {
        return res || fetch(e.request);
      })
    );
  }
});

self.addEventListener("push", (e) => {
  let body;
  if (e.data) {
    body = e.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
    body: body,
    icon: "assets/icons/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  e.waitUntil(self.registration.showNotification("Notification", options));
});
