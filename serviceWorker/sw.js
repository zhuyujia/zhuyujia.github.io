self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v2').then(function(cache) {
            return cache.addAll([
                'normalize.css',
                '//unpkg.com/mescroll.js@1.4.1/mescroll.min.css',
                '//unpkg.com/mescroll.js@1.4.1/mescroll.min.js'
            ]);
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

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['v2'];
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        });
    );
});