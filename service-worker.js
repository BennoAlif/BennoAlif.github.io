importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
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
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);