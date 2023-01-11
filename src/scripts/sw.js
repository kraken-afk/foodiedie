console.log('hello from service worker');

catchCachesFiles();

self.addEventListener('install', async (event) => {
  event.waitUntil(addResourcesToCache(catchCachesFiles()));
});

self.addEventListener('fetch', (event) => {
  const response = cacheFirst(event.request);
  event.respondWith(response);
});

async function catchCachesFiles() {
  const files = await fetch('./ls.json').then((payload) => payload.json());
  const resourcesToCache = [ "/" ];

  files.forEach(({ filename }) => resourcesToCache.push(filename));
  return resourcesToCache;
}

async function addResourcesToCache(resources) {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
}

async function cacheFirst(request) {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  } else {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  }
}

async function putInCache(request, response) {
  const cache = await caches.open('v1');
  await cache.put(request, response);
}