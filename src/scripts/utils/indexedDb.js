import { DB_NAME } from '@global/config';

// TODO: make it more efficient by create independent module

function openDbPromise()  {
  return new Promise((resolve, reject) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    const request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = ({ target }) => {
      const db = target.result;

      window.onunload = () => db.close();
      resolve(({
        add(data) {
          const transaction = db.transaction('restaurants', 'readwrite')
          const objectStore = transaction.objectStore('restaurants');
          const request = objectStore.add(data);

          request.onsuccess = () => {
            resolve(request.result);
          };

          request.onerror = () => {
            console.error(request);
            reject(request.result);
          };
        },

        get(id) {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction('restaurants', 'readonly')
            const objectStore = transaction.objectStore('restaurants');
            const request = objectStore.get(id);


            request.onsuccess = () => {
              resolve(request.result);
            };

            request.onerror = () => {
              console.error(request);
              reject(request.result);
            };
          });
        },

        getAll() {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction('restaurants', 'readonly')
            const objectStore = transaction.objectStore('restaurants');
            const request = objectStore.getAll();

            request.onsuccess = () => {
              resolve(request.result);
            };

            request.onerror = () => {
              console.error(request);
              reject(request.result);
            };
          });
        },

        remove(id) {
          const transaction = db.transaction('restaurants', 'readwrite')
          const objectStore = transaction.objectStore('restaurants');
          const request = objectStore.delete(id);

          request.onsuccess = () => {
            resolve(request.result);
          };

          request.onerror = () => {
            console.error(request);
            reject(request.result);
          };
        },

        search(name) {
          const transaction = db.transaction('restaurants', 'readonly')
          const objectStore = transaction.objectStore('restaurants');
          const index = objectStore.index('name');
          const request = index.get(name);

          request.onsuccess = () => {
            resolve(request.result);
          };

          request.onerror = () => {
            console.error(request);
            reject(request.result);
          };
        },

        close() {
          db.close();
        },
      }));
    };

    request.onerror = (error) => {
      reject({
        message: 'an error occured while opening IndexedDb',
        ...error,
      });
    };

    request.onupgradeneeded = ({ target }) => {
      const ObjectStoreName = 'restaurants';
      const db = target.result;
      const objectStore = db.createObjectStore(ObjectStoreName, { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
    };
  });
}

export default async function openLocalDb() {
  try {
    const db = await openDbPromise()
      .then(db => db)
      .catch(err => err);
    return db;
  } catch (error) {
    return error;
  }
}