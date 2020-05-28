importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.setConfig({ debug: true });

workbox.precaching.precacheAndRoute(
  [
    { url: "/index.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/team.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/my-favorites.html", revision: "1" },
    { url: "/pages/saved.html", revision: "1" },
    { url: "/bundle.js", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/assets/bg.jpg", revision: "1" },
    { url: "/assets/no-image.png", revision: "1" },
    { url: "/assets/icons/icon-128x128.png", revision: "1" },
    { url: "/assets/icons/icon-144x144.png", revision: "1" },
    { url: "/assets/icons/icon-152x152.png", revision: "1" },
    { url: "/assets/icons/icon-192x192.png", revision: "1" },
    { url: "/assets/icons/icon-384x384.png", revision: "1" },
    { url: "/assets/icons/icon-512x512.png", revision: "1" },
    { url: "/assets/icons/icon-72x72.png", revision: "1" },
    { url: "/assets/icons/icon-96x96.png", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp(".*.js"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("/css/materialize.min.css"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp(".*.png"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

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
