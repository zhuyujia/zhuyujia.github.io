const CACHE_VERSION = 3; // 可以是时间戳
const CACHE_NAME = `cache_v${CACHE_VERSION}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                'normalize.css',
                'app.js',
                '//unpkg.com/mescroll.js@1.4.1/mescroll.min.css',
                '//unpkg.com/mescroll.js@1.4.1/mescroll.min.js'
            ]);
        }).then(() => {
            return self.skipWaiting(); // 可以阻止等待，让新 SW 安装成功后立即激活
        }).catch(err => {
            console.log(err);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                if ([CACHE_NAME].indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            }));
        }).then(() => {
            // return self.clients.claim();
        })
    );
});
  
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        // if (response !== undefined) {
        //     return response;
        // } else {
        //     return fetch(event.request).then(function (response) {
        //         // response may be used only once
        //         // we need to save clone to put one copy in cache
        //         // and serve second one
        //         let responseClone = response.clone();
                
        //         caches.open('v1').then(function (cache) {
        //             cache.put(event.request, responseClone);
        //         });
        //         return response;
        //     }).catch(function () {
        //         return caches.match('/sw-test/gallery/myLittleVader.jpg');
        //     });
        // }
        return response || fetch(event.request);
    }));
});