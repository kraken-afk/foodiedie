/* eslint-disable no-restricted-globals */
async function catchCachesFiles() {
  const files = await fetch('./ls.json').then((payload) => payload.json());
  const resourcesToCache = ['/'];

  files.forEach(({ filename }) => resourcesToCache.push(filename));
  return resourcesToCache;
}

async function addResourcesToCache(resources) {
  const cache = await caches.open('v1');
  await cache.addAll(await resources);
}

async function putInCache(request, response) {
  const cache = await caches.open('v1');
  await cache.put(request, response);
}

async function cacheFirst(request) {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
}

catchCachesFiles();

self.addEventListener('install', (event) => {
  event.waitUntil(addResourcesToCache(catchCachesFiles()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST') return;

  const response = cacheFirst(event.request);
  event.respondWith(response);
});
