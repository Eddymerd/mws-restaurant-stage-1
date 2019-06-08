import idb from 'idb';

const dbPromise = {
  // creation and updating of database happens here.
  db: idb.open('restaurant-reviews-db', 1, function (upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });
    }
  }),

};

export default dbPromise;
