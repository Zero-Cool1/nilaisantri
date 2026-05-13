const CACHE_NAME = 'nilai-hsi-v5';
self.addEventListener('install', function(event) { self.skipWaiting(); });
self.addEventListener('fetch', function(event) {
    if (!event.request.url.startsWith('http')) return;
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            return fetch(event.request).then(function(response) {
                if (!response || response.status !== 200) return response;
                if (event.request.url.startsWith('https://') || event.request.url.startsWith('http://')) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
                }
                return response;
            }).catch(function() { return caches.match('/'); });
        })
    );
});
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(names) { return Promise.all(names.map(function(n) { return caches.delete(n); })); }).then(function() { return self.clients.claim(); }));
});