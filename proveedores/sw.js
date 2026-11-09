// Service worker mínimo del portal de proveedores: lo hace instalable y guarda solo esta página y su manifiesto.
// El portal (Google) nunca se guarda aquí: siempre se pide en vivo. Los íconos son los mismos de la app I+M (carpeta superior).
var CACHE = 'im-prov-v2';
var ARCHIVOS = ['./', './index.html', './entrada.js', './manifest.json', '../icono-192.png', '../icono-512.png', '../apple-touch-icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return /^im-prov-/.test(k) && k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.method !== 'GET') return;
  if (/\/entrada\.js$/.test(u.pathname)) { e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(function () { return caches.match('./entrada.js'); })); return; }
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r; }).catch(function () { return caches.match(e.request); }));
});
