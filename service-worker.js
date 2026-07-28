/* ==========================
   Dragon Ball Z RPG
   Service Worker v2
   ========================== */

const CACHE_VERSION = "dbzrpg-v2";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

/* Arquivos mínimos para iniciar o jogo */
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./js/script.js"
];

/* -------------------------
   INSTALAÇÃO
-------------------------- */

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(APP_SHELL))
            .catch(err => {
                console.error("Erro ao criar cache:", err);
            })

    );

});

/* -------------------------
   ATIVAÇÃO
-------------------------- */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (
                        key !== STATIC_CACHE &&
                        key !== DYNAMIC_CACHE
                    ) {
                        return caches.delete(key);
                    }

                })

            );

        }).then(() => self.clients.claim())

    );

});

/* -------------------------
   FETCH
-------------------------- */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // Não faz cache de extensões do Chrome
    if (url.protocol.startsWith("chrome")) return;

    event.respondWith(

        caches.match(event.request).then(cacheResponse => {

            if (cacheResponse) {

                // Atualiza em segundo plano
                fetch(event.request)
                    .then(networkResponse => {

                        if (networkResponse.ok) {

                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        networkResponse.clone()
                                    );

                                });

                        }

                    })
                    .catch(() => {});

                return cacheResponse;

            }

            return fetch(event.request)

                .then(networkResponse => {

                    if (!networkResponse || !networkResponse.ok) {
                        return networkResponse;
                    }

                    const clone = networkResponse.clone();

                    caches.open(DYNAMIC_CACHE)
                        .then(cache => {

                            cache.put(event.request, clone);

                        });

                    return networkResponse;

                })

                .catch(async () => {

                    // Se existir em qualquer cache
                    const cached = await caches.match(event.request);

                    if (cached) return cached;

                    // Se não existir, retorna erro offline
                    return new Response(
                        "Offline",
                        {
                            status: 503,
                            statusText: "Offline"
                        }
                    );

                });

        })

    );

});