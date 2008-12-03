var cacheName = 'QRECORD';
var filesToCache = [
  '',
 //'player.html',
 'player.css',
 'player.js',
 'jquery.js',
 'jquery3.js',
 'jquery.form.js',
 'activeFunctions.js',
 'scripts/serverActions.js',
 'images/web/icon.png',
 'playerAnimation.js'
 ];
 //Start the service worker and cache all of the app's content 
filesToCache.map((e)=>{
  if(self.caches.has(e)){
 //self.caches.delete(e);
console.log(e);
  }
},10);


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("caches")
      self.clients.claim();
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

//console.log(self.cleints);

//git Serve fetch content when offline 
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener("activate",()=>{
  console.log("PWA activated");
});

//notification Android
if (self.Notification.permission === 'granted') {
  const notificationObject = {
    body: 'Click here to view your messages.',
    data: { url: self.location.origin + '/app.html' },
  };
  self.registration.showNotification('You\'ve got messages!', notificationObject);
}

self.addEventListener('notificationclick', e => {
  // Close the notification popout
  e.notification.close();
  // Get all the Window clients
  e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
    // If a Window tab matching the targeted URL already exists, focus that;
    const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false);
    // Otherwise, open a new tab to the applicable URL and focus it.
    if (!hadWindowToFocus) clients.openWindow(e.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
  }));
});

//notification ends*/
