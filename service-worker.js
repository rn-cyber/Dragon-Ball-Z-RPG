const CACHE_NAME = "dragonball-v01";

const arquivos = [
  "./",
  "./index.html",
  "./script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(arquivos);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resposta => {
      return resposta || fetch(event.request);
    })
  );
});
