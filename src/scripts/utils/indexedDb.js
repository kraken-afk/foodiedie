import { DB_NAME } from '@global/config';

// TODO: make it more efficient by create independent module

function openDbPromise() {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB
      || window.mozIndexedDB
      || window.webkitIndexedDB
      || window.msIndexedDB
      || window.shimIndexedDB;

    const request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = ({ target }) => {
      const db = target.result;

      window.onunload = () => db.close();
      resolve(({
        add(data) {
          const transaction = db.transaction('restaurants', 'readwrite');
          const objectStore = transaction.objectStore('restaurants');
          const requestCurrentScope = objectStore.add(data);

          requestCurrentScope.onsuccess = () => {
            resolve(requestCurrentScope.result);
          };

          requestCurrentScope.onerror = () => {
            reject(requestCurrentScope.result);
          };
        },

        get(id) {
          return new Promise((_resolve, _reject) => {
            const transaction = db.transaction('restaurants', 'readonly');
            const objectStore = transaction.objectStore('restaurants');
            const requestCurrentScope = objectStore.get(id);

            requestCurrentScope.onsuccess = () => {
              _resolve(requestCurrentScope.result);
            };

            requestCurrentScope.onerror = () => {
              _reject(requestCurrentScope.result);
            };
          });
        },

        getAll() {
          return new Promise((_resolve, _reject) => {
            const transaction = db.transaction('restaurants', 'readonly');
            const objectStore = transaction.objectStore('restaurants');
            const requestCurrentScope = objectStore.getAll();

            requestCurrentScope.onsuccess = () => {
              _resolve(requestCurrentScope.result);
            };

            requestCurrentScope.onerror = () => {
              _reject(requestCurrentScope.result);
            };
          });
        },

        remove(id) {
          const transaction = db.transaction('restaurants', 'readwrite');
          const objectStore = transaction.objectStore('restaurants');
          const requestCurrentScope = objectStore.delete(id);

          requestCurrentScope.onsuccess = () => {
            resolve(requestCurrentScope.result);
          };

          requestCurrentScope.onerror = () => {
            reject(requestCurrentScope.result);
          };
        },

        search(name) {
          const transaction = db.transaction('restaurants', 'readonly');
          const objectStore = transaction.objectStore('restaurants');
          const index = objectStore.index('name');
          const requestCurrentScope = index.get(name);

          requestCurrentScope.onsuccess = () => {
            resolve(requestCurrentScope.result);
          };

          requestCurrentScope.onerror = () => {
            reject(requestCurrentScope.result);
          };
        },

        close() {
          db.close();
        },
      }));
    };

    request.onerror = (error) => {
      reject(error);
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
      .then((response) => response)
      .catch((err) => err);
    return db;
  } catch (error) {
    return error;
  }
}
