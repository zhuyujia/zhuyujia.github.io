const cacheList = [
    'app.js',
    '//unpkg.com/mescroll.js@1.4.1/mescroll.min.css',
    '//unpkg.com/mescroll.js@1.4.1/mescroll.min.js',
];
const CACHE_VERSION = 7; // 可以是时间戳
const CACHE_NAME = `cache_v${CACHE_VERSION}`;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        }).then(() => {
            return self.skipWaiting(); // 新sw安装成功后跳过等待，立即激活，替换老的sw
        }).catch(err => {
            console.log(err);
        })
    );
});

self.addEventListener('activate', event => {
    // 删除旧的缓存，只保留最新的缓存
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (![CACHE_NAME].includes(key)) {
                    return caches.delete(key);
                }
            }));
        }).catch(err => {
            console.log(err);
        })
    );
});
  
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            // return response || fetch(event.request);
        }).catch(err => {
            console.log(err);
        })
    );
});