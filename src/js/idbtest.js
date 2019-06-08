import idb from 'idb';

var dbPromise = idb.open('testdb', 2, function(upgradeDb){
  switch(upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
    case 1:
      upgradeDb.createObjectStore('people', {keypath: 'name' });
  }
});


//read "hello" in "keyval"
dbPromise.then(function(db){
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyVal');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('The value of "hello" is: ', val);
});

dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('cat', 'favoriteAnimal');
  return tx.complete;
}).then.(function() {
  console.log('Added favoriteAnimal: cat to keyVal');
});


dbPromise.then(function(db) {
  var tx db.transaction('people', 'readwrite');
  var peopleStore = tx.objectStore('people');

  peopleStore.put({
    name: 'Sam Munoz',
    age: 25,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Susan Keller',
    age: 34,
    favoriteAnimal: 'cat'
  });

  peopleStore.put({
    name: 'Lillie Wolfe',
    age: 28,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Marc Stone',
    age: 39,
    favoriteAnimal: 'cat
});

  return tx.complete;
}).then(function() {
  console.log('People added');
});


dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');

  return peopleStore.getAll();
}).then(function(people) {
  console.log('People:', people);
});
