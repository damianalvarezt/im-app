// Portal de proveedores I+M: lo que cambia vive aquí; index.html solo carga este archivo sin caché (?t=…), así los cambios llegan al tiro.
(function () {
  var st = document.createElement('style'); st.textContent = "  :root { --fondo: #24585e; --claro: #7cc4c8; --texto: #ffffff; }\n  html, body { margin: 0; height: 100%; background: #f3f4f2; color: var(--texto); overflow: hidden;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; }\n  #portal { position: fixed; left: 0; right: 0; top: env(safe-area-inset-top, 0px); bottom: 0; width: 100%;\n    height: calc(100% - env(safe-area-inset-top, 0px)); border: 0; background: #f3f4f2; }\n  #carga { position: fixed; inset: 0; background: var(--fondo); z-index: 3; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 16px; text-align: center; padding: 24px 16px; box-sizing: border-box; transition: opacity .3s; }\n  #carga.off { opacity: 0; pointer-events: none; }\n  /* animación oficial de carga I+M (la misma de la app): la llave aprieta la tuerca del «+» */\n.llv{width:184px;height:115px;display:block;overflow:visible;margin:0;font-family:\"Barlow Condensed\",\"Arial Narrow\",system-ui,sans-serif;font-weight:700}\n/* la I es una llave doble: va hasta la tuerca, la aprieta y vuelve a su lugar */\n.llv .lli{transform-origin:63.5px 42.6px;animation:lli 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .tuerca{transform-origin:98px 72px;animation:tuerca 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .lm{transform-origin:154.5px 113px;animation:lm 2.6s cubic-bezier(.35,0,.25,1) infinite}\n@keyframes lli{\n  0%,8%{transform:translate(0,0) rotate(0)}\n  28%{transform:translate(34.5px,29.4px) rotate(15deg)}      /* llega inclinada y toma la tuerca */\n  34%{transform:translate(34.5px,29.4px) rotate(15deg)}\n  52%{transform:translate(34.5px,29.4px) rotate(75deg)}       /* aprieta (sentido del reloj) */\n  58%{transform:translate(34.5px,29.4px) rotate(75deg)}\n  64%{transform:translate(25.5px,37.4px) rotate(75deg)}       /* se suelta */\n  84%,100%{transform:translate(0,0) rotate(0)}            /* vuelve a ser la I */\n}\n@keyframes tuerca{0%,34%{transform:rotate(0)}52%,100%{transform:rotate(60deg)}}\n@keyframes lm{\n  0%,12%{transform:none}\n  20%{transform:scale(.97,1.05)}                                      /* ¡eh! se sorprende */\n  30%{transform:translate(6px,0) skewX(-14deg) scale(1.06,.86)}       /* se encoge y echa la parte de arriba hacia atrás */\n  38%{transform:translate(6px,0) skewX(-12deg) scale(1.07,.85)}       /* tiembla */\n  46%{transform:translate(7px,0) skewX(-16deg) scale(1.05,.87)}\n  55%{transform:translate(9px,0) skewX(-20deg) scale(1.12,.78)}       /* el golpe: se aplasta */\n  66%{transform:translate(-2px,0) skewX(6deg) scale(.95,1.08)}        /* rebota */\n  76%{transform:translate(1px,0) skewX(-2deg) scale(1.02,.98)}\n  84%,100%{transform:none}\n}\n@media (prefers-reduced-motion:reduce){.llv .lli,.llv .tuerca,.llv .lm{animation:none}}\n  #carga .llv { margin-bottom: 22px; }\n  #carga p { margin: 0; opacity: .9; max-width: 34ch; line-height: 1.4; }\n  .btn { color: var(--fondo); background: var(--claro); padding: 12px 22px; border-radius: 12px; font: inherit; font-weight: 600;\n    text-decoration: none; border: 0; cursor: pointer; }\n  #inst { position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); z-index: 5;\n    background: #1f2527; color: #eef1f0; border: 1px solid #343d40; border-radius: 14px; padding: 12px 14px;\n    display: none; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.4); font-size: 15px; }\n  #inst.on { display: flex; }\n  #inst img { width: 40px; height: 40px; border-radius: 10px; flex: none; }\n  #inst div { flex: 1; min-width: 0; line-height: 1.3; }\n  #inst small { display: block; opacity: .8; font-size: 13px; }\n  #inst .x { background: transparent; color: #a3acae; border: 0; font-size: 22px; padding: 4px 8px; cursor: pointer; }\n"; document.head.appendChild(st);
  document.body.innerHTML = "<iframe id=\"portal\" title=\"Portal de proveedores I+M\" allow=\"camera; clipboard-read; clipboard-write; fullscreen; web-share\" hidden></iframe>\n<div id=\"carga\">\n  <svg class=\"llv\" viewBox=\"40 21 160 100\" aria-hidden=\"true\">\n  <path class=\"lm\" fill=\"#ffffff\" d=\"M119.5 113 V31 H133.5 L154.5 84 L175.5 31 H189.5 V113 H177.5 V60 L158.5 104 H150.5 L131.5 60 V113 Z\"/>\n  <g class=\"tuerca\">\n    <polygon points=\"106.7,72.0 102.3,79.5 93.7,79.5 89.3,72.0 93.7,64.5 102.3,64.5\" fill=\"#7cc4c8\"/>\n    <polygon points=\"103.7,72.0 100.9,77.0 95.1,77.0 92.3,72.0 95.1,67.0 100.9,67.0\" fill=\"#5ea6ab\"/>\n    <circle cx=\"98\" cy=\"72\" r=\"2.8\" fill=\"#24585e\"/>\n  </g>\n  <g class=\"lli\"><g transform=\"translate(63.5 72) scale(1.05) translate(-63.5 -72)\">\n    <g transform=\"rotate(-15 63.5 44)\"><mask id=\"c1\"><rect x=\"0\" y=\"0\" width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"56.0\" y=\"1.5\" width=\"15.0\" height=\"45\" rx=\"1.5\" fill=\"#000\"/><rect x=\"47.5\" y=\"-6.399999999999999\" width=\"32\" height=\"40\" fill=\"#000\"/></mask><circle cx=\"63.5\" cy=\"44\" r=\"13\" fill=\"#ffffff\" mask=\"url(#c1)\"/></g>\n    <g transform=\"rotate(-15 63.5 100)\"><mask id=\"c2\"><rect x=\"0\" y=\"0\" width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"56.0\" y=\"97.5\" width=\"15.0\" height=\"45\" rx=\"1.5\" fill=\"#000\"/><rect x=\"47.5\" y=\"110.4\" width=\"32\" height=\"40\" fill=\"#000\"/></mask><circle cx=\"63.5\" cy=\"100\" r=\"13\" fill=\"#ffffff\" mask=\"url(#c2)\"/></g>\n    <rect x=\"57.5\" y=\"48\" width=\"12\" height=\"48\" fill=\"#ffffff\"/>\n  </g></g>\n</svg>\n  <p id=\"txt\">Cargando portal de proveedores…</p>\n  <a class=\"btn\" id=\"ir\" href=\"#\" hidden>Abrir portal</a>\n</div>\n<div id=\"inst\">\n  <img src=\"../icono-192.png\" alt=\"\">\n  <div><b>Instalar como app</b><small id=\"instS\">Queda en tu pantalla de inicio con el ícono I+M.</small></div>\n  <button class=\"btn\" id=\"instB\" type=\"button\">Instalar</button>\n  <button class=\"x\" id=\"instX\" type=\"button\" aria-label=\"Cerrar\">×</button>\n</div>\n";
  // Portal de proveedores I+M. Esta página es pública y no contiene datos: solo muestra el portal (Google) adentro.
  // El enlace personal llega como …/proveedores/#p=<token>; el token queda guardado en este celular para abrir desde el ícono.
  // Igual se pide el PIN en cada ingreso.
  var BASE = 'https://script.google.com/macros/s/AKfycbwx5dVRtiMdf1LwXNkhXkhAoQt-VVjq6vHr4d5jpD7unWbl6t6mJLILWZUEeo97Dxht3A/exec';
  var esIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var instalada = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  var fr = document.getElementById('portal'), carga = document.getElementById('carga'), txt = document.getElementById('txt'), ir = document.getElementById('ir');
  function leer() { try { return localStorage.getItem('prov:tok') || ''; } catch (e) { return ''; } }
  function guardar(t) { try { localStorage.setItem('prov:tok', t); } catch (e) {} }
  var m = /(?:^|[#&?])p=([a-f0-9]{32,64})(?:&|$)/.exec(location.hash) || /(?:^|[?&])p=([a-f0-9]{32,64})(?:&|$)/.exec(location.search);
  var tok = m ? m[1] : leer();
  if (m) guardar(tok);
  // Android/PC: el ícono abre «./» y el token sale de la memoria, así que se limpia la dirección.
  // iPhone/iPad: se deja el token en la dirección, porque el ícono guarda la dirección exacta (y su memoria puede ser otra).
  if (m && !esIOS) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }
  // El manifiesto (instalación como app) solo en Android/PC: en iPhone se usa la dirección con el token.
  if (!esIOS) { var lk = document.createElement('link'); lk.rel = 'manifest'; lk.href = 'manifest.json'; document.head.appendChild(lk); }
  if (!tok) {
    txt.textContent = 'Para entrar, abre el enlace personal que te enviamos por WhatsApp. Si lo perdiste, pídelo al área de Ingeniería y Mantención.';
    carga.querySelectorAll('.llv *').forEach(function (x) { x.style.animation = 'none'; });
  } else {
    var url = BASE + '?p=' + tok;
    ir.href = url;
    fr.hidden = false;
    fr.src = url;
    var quitar = function () { carga.classList.add('off'); ir.hidden = true; };
    fr.addEventListener('load', function () { setTimeout(quitar, 600); });
    setTimeout(function () { if (!carga.classList.contains('off')) { ir.hidden = false; txt.textContent = 'El portal está tardando. Puedes abrirlo directo:'; } }, 15000);
    window.addEventListener('message', function (e) {
      var deGoogle = e.origin === 'https://script.google.com' || /\.googleusercontent\.com$/.test(e.origin);
      if (deGoogle && e.data && e.data.im === 'listo') quitar();
    });
  }
  // ---- instalación como app ----
  var inst = document.getElementById('inst'), instB = document.getElementById('instB'), instS = document.getElementById('instS'), pedirInst = null;
  function no() { try { return !!localStorage.getItem('prov:instNo'); } catch (e) { return false; } }
  function mostrar() { if (!instalada && tok) inst.classList.add('on'); }
  if ('serviceWorker' in navigator && !esIOS) navigator.serviceWorker.register('sw.js').catch(function () {});
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); pedirInst = e; if (!no()) mostrar(); });
  instB.addEventListener('click', function () {
    if (pedirInst) { pedirInst.prompt(); pedirInst.userChoice.then(function () { inst.classList.remove('on'); pedirInst = null; }); return; }
    if (esIOS) { instS.textContent = 'En Safari: toca Compartir (cuadrado con flecha) → «Agregar a inicio» → Agregar.'; instB.hidden = true; return; }
    instS.textContent = 'En Chrome: menú ⋮ → «Instalar aplicación» (o «Agregar a pantalla de inicio»).'; instB.hidden = true;
  });
  document.getElementById('instX').addEventListener('click', function () { inst.classList.remove('on'); try { localStorage.setItem('prov:instNo', '1'); } catch (e) {} });
  window.addEventListener('appinstalled', function () { inst.classList.remove('on'); });
  if (esIOS && !instalada && !no()) setTimeout(mostrar, 1500);
})();
