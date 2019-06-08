//called when the web socket sends restaurant data

restaurantsdb.prototype._onSocketMessage = function(data) {
var restaurants = JSON.parse(data);

this.dbPromise.then(function(db) {
  if (!db) return;

  //TODO: Put each restaurant into the 'restaurants' object store
  var
})
}
