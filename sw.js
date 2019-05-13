var cacheID ='cache-v1';
var cacheContent = [
    '/', // index.html
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'js/register_sw.js',
]

self.addEventListener('install', function(e) {
  console.log("serviceWorker installed")

  e.waitUntil(
    caches.open(cacheID).then(function(cache){
      console.log("serviceWorker caching files!");
      return cache.addAll(cacheContent);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log("serviceWorker activated")

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cache-v') &&
                  cacheName != cacheID;
        }).map(function(cacheName) {
          console.log("serviceWorker deleting old cached files");
          return caches.delete(cacheName);
        })
      );
    })
  );
})

self.addEventListener('fetch', function(e) {
  console.log("serviceWorker fetching");

  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response){
        console.log('cached asset returned');
        return response;
      }
      console.log('fetched new asset');
      return fetch (e.request);
    })
  )
});
