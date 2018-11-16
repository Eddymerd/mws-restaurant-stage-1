if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
  .then(function(reg) {
    console.log("Service Worker Registered! Yasssss!", reg);
  })
  .catch(function(error) {
    console.log("Could not register serviceWorker.", error);
  })
}
