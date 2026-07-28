const CACHE_NAME = "dragonball-v001";

// Arquivos essenciais para iniciar o jogo
const CORE_FILES = [
    "./",
    "./index.html",
    "./script.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request).then(cacheResponse => {

            if (cacheResponse) {
                return cacheResponse;
            }

            return fetch(event.request)
                .then(networkResponse => {

                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });

                    return networkResponse;

                }).catch(() => {

                    // Se não houver internet e o arquivo nunca foi salvo,
                    // apenas retorna vazio.
                    return new Response("", {
                        status: 404,
                        statusText: "Offline"
                    });

                });

        })

    );

});