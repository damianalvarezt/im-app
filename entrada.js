// Página de entrada de la app I+M (lo que cambia seguido vive aquí; index.html solo carga este archivo sin caché).
(function(){
var st=document.createElement('style');st.textContent="\n  :root { --fondo: #24585e; --claro: #7cc4c8; --texto: #ffffff; }\n  html, body { margin: 0; height: 100%; background: var(--fondo); color: var(--texto); overflow: hidden;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; }\n  /* la app de Google ocupa toda la pantalla; en iPhone instalado respeta la muesca */\n  #app { position: fixed; left: 0; right: 0; top: env(safe-area-inset-top, 0px); bottom: 0; width: 100%;\n    height: calc(100% - env(safe-area-inset-top, 0px)); border: 0; background: #0e1112; }\n  body { background: #0e1112; }\n  #carga { position: fixed; inset: 0; background: var(--fondo); z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center;\n    gap: 16px; text-align: center; padding: 24px 16px; transition: opacity .3s; }\n  #carga.off { opacity: 0; pointer-events: none; }\n  /* animaci\u00f3n de carga: la llave aprieta la tuerca del \u00ab+\u00bb de I+M */\n  .llv{width:210px;height:158px;display:block;font-family:\"Barlow Condensed\",\"Arial Narrow\",system-ui,sans-serif;font-weight:700}\n/* la I es una llave doble: va hasta la tuerca, la aprieta y vuelve a su lugar */\n.llv .lli{transform-origin:56px 55px;animation:lli 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .tuerca{transform-origin:112px 72px;animation:tuerca 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .lm{transform-origin:170px 100px;animation:lm 2.6s cubic-bezier(.35,0,.25,1) infinite}\n@keyframes lli{\n  0%,8%{transform:translate(0,0) rotate(0)}\n  28%{transform:translate(56px,17px) rotate(-6deg)}       /* llega y toma la tuerca */\n  34%{transform:translate(56px,17px) rotate(-6deg)}\n  52%{transform:translate(56px,17px) rotate(54deg)}       /* aprieta (sentido del reloj) */\n  58%{transform:translate(56px,17px) rotate(54deg)}\n  64%{transform:translate(48px,26px) rotate(54deg)}       /* se suelta */\n  84%,100%{transform:translate(0,0) rotate(0)}            /* vuelve a ser la I */\n}\n@keyframes tuerca{0%,34%{transform:rotate(0)}52%,100%{transform:rotate(60deg)}}\n@keyframes lm{0%,50%{transform:rotate(0) scale(1)}55%{transform:rotate(9deg) scale(1,.94)}64%{transform:rotate(-2deg) scale(1,1.02)}72%,100%{transform:rotate(0) scale(1)}}\n@media (prefers-reduced-motion:reduce){.llv .lli,.llv .tuerca,.llv .lm{animation:none}}\n";document.head.appendChild(st);
document.body.innerHTML="<iframe id=\"app\" title=\"I+M Mantenci\u00f3n\" allow=\"camera; microphone; geolocation; clipboard-read; clipboard-write; fullscreen; web-share\" allowfullscreen></iframe>\n<div id=\"carga\">\n  <svg class=\"llv\" viewBox=\"0 0 240 180\" aria-hidden=\"true\">\n  <text class=\"lm\" x=\"170\" y=\"100\" font-size=\"80\" fill=\"#ffffff\" text-anchor=\"middle\">M</text>\n  <!-- tuerca = el \u00ab+\u00bb -->\n  <g class=\"tuerca\">\n    <polygon points=\"112,61 121.5,66.5 121.5,77.5 112,83 102.5,77.5 102.5,66.5\" fill=\"#7cc4c8\"/>\n    <polygon points=\"112,65.5 117.6,68.8 117.6,75.2 112,78.5 106.4,75.2 106.4,68.8\" fill=\"#5ea6ab\"/>\n    <circle cx=\"112\" cy=\"72\" r=\"3.4\" fill=\"#24585e\"/>\n  </g>\n  <!-- la I: llave doble (boca arriba y boca abajo) -->\n  <g class=\"lli\">\n    <mask id=\"b1\"><rect width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"46.5\" y=\"30\" width=\"19\" height=\"25\" fill=\"#000\"/></mask>\n    <mask id=\"b2\"><rect width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"46.5\" y=\"90\" width=\"19\" height=\"25\" fill=\"#000\"/></mask>\n    <circle cx=\"56\" cy=\"55\" r=\"13\" fill=\"#ffffff\" mask=\"url(#b1)\"/>\n    <circle cx=\"56\" cy=\"90\" r=\"13\" fill=\"#ffffff\" mask=\"url(#b2)\"/>\n    <rect x=\"50.5\" y=\"60\" width=\"11\" height=\"25\" fill=\"#ffffff\"/>\n  </g>\n</svg>\n  <p>Abriendo I+M Mantenci\u00f3n\u2026</p>\n  <a class=\"btn\" id=\"ir\" href=\"#\" hidden>Entrar</a>\n</div>\n<div id=\"inst\">\n  <img src=\"icono-192.png\" alt=\"\">\n  <div><b id=\"instT\">Instalar I+M como app</b><small id=\"instS\">Queda en tu pantalla de inicio con su \u00edcono.</small></div>\n  <button class=\"btn\" id=\"instB\" type=\"button\">Instalar</button>\n  <button class=\"x\" id=\"instX\" type=\"button\" aria-label=\"Cerrar\">\u00d7</button>\n</div>";

  // Única dirección de la app (la misma que ya tiene el equipo). Esta página no contiene datos ni claves.
  var APP = 'https://script.google.com/macros/s/AKfycbwx5dVRtiMdf1LwXNkhXkhAoQt-VVjq6vHr4d5jpD7unWbl6t6mJLILWZUEeo97Dxht3A/exec?app';
  // iPhone/iPad: Safari no guarda la clave ni el patrón dentro de una app instalada con la app de Google adentro.
  // Por eso en Apple se usa la página ios.html: mismo ícono, pero abre la app en Safari (ahí sí se guarda todo).
  var esIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var fr = document.getElementById('app'), carga = document.getElementById('carga'), ir = document.getElementById('ir');
  var ok = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec\?app$/.test(APP);
  if (ok) {
    ir.href = APP;
    fr.src = APP;
    // la cortina se quita cuando la app avisa que ya se dibujó; si no avisa (versión vieja del servidor o sin señal), se ofrece entrar directo
    setTimeout(function () { if (!carga.classList.contains('off')) { ir.hidden = false; carga.querySelector('p').textContent = 'La app no respondió desde aquí. Entra directo:'; } }, 12000);
  } else {
    carga.querySelector('p').textContent = 'Falta configurar la dirección';
  }
  // la app pide recargar (botón ↻ adentro): se vuelve a pedir a Google desde aquí
  window.addEventListener('message', function (e) {
    var deGoogle = e.origin === 'https://script.google.com' || /\.googleusercontent\.com$/.test(e.origin);
    // memoria de la app (clave, patrón, preferencias): se guarda aquí, en el origen propio, porque en iPhone la app de adentro no puede guardar nada
    if (deGoogle && e.data && e.data.im === 'ls-get') {
      var d = {}; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf('app:') === 0) d[k.slice(4)] = localStorage.getItem(k); } } catch (x) {}
      try { e.source.postMessage({ im: 'ls-datos', datos: d }, e.origin); } catch (x) {}
    }
    if (deGoogle && e.data && e.data.im === 'ls-set') { try { localStorage.setItem('app:' + e.data.k, String(e.data.v)); } catch (x) {} }
    if (deGoogle && e.data && e.data.im === 'ls-del') { try { localStorage.removeItem('app:' + e.data.k); } catch (x) {} }
    if (deGoogle && e.data && e.data.im === 'listo') { carga.classList.add('off'); ir.hidden = true; }
    if (deGoogle && e.data && e.data.im === 'recargar' && ok) { carga.classList.remove('off'); fr.src = 'about:blank'; setTimeout(function () { fr.src = APP; }, 50); }
  });
  // ---- instalación como app ----
  var instalada = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  var inst = document.getElementById('inst'), instB = document.getElementById('instB'), instS = document.getElementById('instS');
  var pedirInst = null, pedido = /instalar/.test(location.search);
  if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(function () {}); }
  function mostrarInst() { if (instalada) return; inst.classList.add('on'); }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); pedirInst = e; if (pedido || !localStorage.getItem('instNo')) mostrarInst(); });
  instB.addEventListener('click', function () {
    if (pedirInst) { pedirInst.prompt(); pedirInst.userChoice.then(function () { inst.classList.remove('on'); pedirInst = null; }); return; }
    if (esIOS) { instS.textContent = 'En Safari: toca Compartir (cuadrado con flecha) → «Agregar a pantalla de inicio» → Agregar.'; instB.hidden = true; return; }
    instS.textContent = 'En Chrome: menú ⋮ → «Instalar aplicación» (o «Agregar a pantalla de inicio»).'; instB.hidden = true;
  });
  document.getElementById('instX').addEventListener('click', function () { inst.classList.remove('on'); try { localStorage.setItem('instNo', '1'); } catch (e) {} });
  window.addEventListener('appinstalled', function () { inst.classList.remove('on'); });
  if (!instalada && (pedido || (esIOS && !localStorage.getItem('instNo')))) { setTimeout(mostrarInst, 1200); }
  if (pedido) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }

})();
