// Service worker mínimo: hace instalable la app y guarda solo esta página de entrada y sus íconos.
// La app de Google nunca se guarda aquí (siempre se pide en vivo).
var CACHE = 'im-app-v2';
var ARCHIVOS = ['./', './index.html', './entrada.js', './manifest.json', './icono-192.png', './icono-512.png', './apple-touch-icon.png', './favicon-32.png', './icono.svg'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return; // Google y el resto: directo a la red
  if (/\/entrada\.js$/.test(u.pathname)) { e.respondWith(fetch(e.request, { cache: 'no-store' }).catch(function () { return caches.match('./entrada.js'); })); return; }
  e.respondWith(fetch(e.request).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r; }).catch(function () { return caches.match(e.request); }));
});
