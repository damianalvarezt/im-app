// Página de entrada de la app I+M (lo que cambia seguido vive aquí; index.html solo carga este archivo sin caché).
(function(){
var st=document.createElement('style');st.textContent="\n  :root { --fondo: #24585e; --claro: #7cc4c8; --texto: #ffffff; }\n  html, body { margin: 0; height: 100%; background: var(--fondo); color: var(--texto); overflow: hidden;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; }\n  /* la app de Google ocupa toda la pantalla; en iPhone instalado respeta la muesca */\n  #app { position: fixed; left: 0; right: 0; top: calc(var(--vt, 0px) + env(safe-area-inset-top, 0px)); bottom: auto; width: 100%;\n    height: calc(var(--vh, 100%) - env(safe-area-inset-top, 0px)); border: 0; background: #0e1112; }\n  body { background: #0e1112; }\n  #carga { position: fixed; inset: 0; background: var(--fondo); z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center;\n    gap: 16px; text-align: center; padding: 24px 16px; transition: opacity .3s; }\n  #carga.off { opacity: 0; pointer-events: none; }\n  /* animaci\u00f3n de carga: la llave aprieta la tuerca del \u00ab+\u00bb de I+M */\n  .llv{width:184px;height:115px;display:block;overflow:visible;margin:0;font-family:\"Barlow Condensed\",\"Arial Narrow\",system-ui,sans-serif;font-weight:700}\n/* la I es una llave doble: va hasta la tuerca, la aprieta y vuelve a su lugar */\n.llv .lli{transform-origin:63.5px 42.6px;animation:lli 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .tuerca{transform-origin:98px 72px;animation:tuerca 2.6s cubic-bezier(.35,0,.25,1) infinite}\n.llv .lm{transform-origin:154.5px 113px;animation:lm 2.6s cubic-bezier(.35,0,.25,1) infinite}\n@keyframes lli{\n  0%,8%{transform:translate(0,0) rotate(0)}\n  28%{transform:translate(34.5px,29.4px) rotate(15deg)}      /* llega inclinada y toma la tuerca */\n  34%{transform:translate(34.5px,29.4px) rotate(15deg)}\n  52%{transform:translate(34.5px,29.4px) rotate(75deg)}       /* aprieta (sentido del reloj) */\n  58%{transform:translate(34.5px,29.4px) rotate(75deg)}\n  64%{transform:translate(25.5px,37.4px) rotate(75deg)}       /* se suelta */\n  84%,100%{transform:translate(0,0) rotate(0)}            /* vuelve a ser la I */\n}\n@keyframes tuerca{0%,34%{transform:rotate(0)}52%,100%{transform:rotate(60deg)}}\n@keyframes lm{\n  0%,12%{transform:none}\n  20%{transform:scale(.97,1.05)}                                      /* \u00a1eh! se sorprende */\n  30%{transform:translate(6px,0) skewX(-14deg) scale(1.06,.86)}       /* se encoge y echa la parte de arriba hacia atr\u00e1s */\n  38%{transform:translate(6px,0) skewX(-12deg) scale(1.07,.85)}       /* tiembla */\n  46%{transform:translate(7px,0) skewX(-16deg) scale(1.05,.87)}\n  55%{transform:translate(9px,0) skewX(-20deg) scale(1.12,.78)}       /* el golpe: se aplasta */\n  66%{transform:translate(-2px,0) skewX(6deg) scale(.95,1.08)}        /* rebota */\n  76%{transform:translate(1px,0) skewX(-2deg) scale(1.02,.98)}\n  84%,100%{transform:none}\n}\n@media (prefers-reduced-motion:reduce){.llv .lli,.llv .tuerca,.llv .lm{animation:none}}\n  /* el logo queda exactamente al centro; el texto y el bot\u00f3n van debajo, en posici\u00f3n fija */\n  #carga p { margin: 0; opacity: .85; position: absolute; left: 16px; right: 16px; top: calc(50% + 84px); }\n  #carga .btn { position: absolute; top: calc(50% + 124px); }\n  .btn { color: var(--fondo); background: var(--claro); padding: 12px 22px; border-radius: 12px; font-weight: 600;\n    text-decoration: none; border: 0; font: inherit; font-weight: 600; cursor: pointer; }\n  /* aviso de instalaci\u00f3n (solo cuando se abre en el navegador, no instalada) */\n  #inst { position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); z-index: 5;\n    background: #1f2527; color: #eef1f0; border: 1px solid #343d40; border-radius: 14px; padding: 12px 14px;\n    display: none; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.4); font-size: 15px; }\n  #inst.on { display: flex; }\n  #inst img { width: 40px; height: 40px; border-radius: 10px; flex: none; }\n  #inst div { flex: 1; min-width: 0; line-height: 1.3; }\n  #inst small { display: block; opacity: .8; font-size: 13px; }\n  #inst .x { background: transparent; color: #a3acae; border: 0; font-size: 20px; padding: 4px 8px; cursor: pointer; }\n  /* v4.69: bot\u00f3n de Face ID (Safari solo permite Face ID en esta p\u00e1gina, no dentro de la app de Google) */\n  #fid { position: fixed; left: 50%; transform: translateX(-50%); width: min(420px, calc(100% - 24px)); bottom: calc(16px + env(safe-area-inset-bottom, 0px)); z-index: 6;\n    background: #1f2527; color: #eef1f0; border: 1px solid #343d40; border-radius: 16px; padding: 14px; box-sizing: border-box;\n    display: none; flex-direction: column; align-items: stretch; gap: 8px; box-shadow: 0 10px 30px rgba(0,0,0,.45); text-align: center; }\n  #fid.on { display: flex; }\n  #fid .btn { font-size: 17px; padding: 14px 22px; display: flex; align-items: center; justify-content: center; gap: 10px; }\n  #fid .btn[disabled] { opacity: .6; }\n  #fid small { color: #f2b8a2; font-size: 13px; min-height: 0; }\n  #fid small:empty { display: none; }\n  #fid .lnk { background: none; border: 0; color: #7cc4c8; font: inherit; font-size: 15px; font-weight: 600; text-decoration: underline; padding: 4px; cursor: pointer; }\n  #fid .lnk[hidden] { display: none; }\n  #fid .nota { color: #a3acae; font-size: 13px; }\n  #fid .nota:empty { display: none; }\n";document.head.appendChild(st);
document.body.innerHTML="<iframe id=\"app\" title=\"I+M Mantenci\u00f3n\" allow=\"camera; microphone; geolocation; clipboard-read; clipboard-write; fullscreen; web-share\" allowfullscreen></iframe>\n<div id=\"carga\">\n  <svg class=\"llv\" viewBox=\"40 21 160 100\" aria-hidden=\"true\">\n  <path class=\"lm\" fill=\"#ffffff\" d=\"M119.5 113 V31 H133.5 L154.5 84 L175.5 31 H189.5 V113 H177.5 V60 L158.5 104 H150.5 L131.5 60 V113 Z\"/>\n  <g class=\"tuerca\">\n    <polygon points=\"106.7,72.0 102.3,79.5 93.7,79.5 89.3,72.0 93.7,64.5 102.3,64.5\" fill=\"#7cc4c8\"/>\n    <polygon points=\"103.7,72.0 100.9,77.0 95.1,77.0 92.3,72.0 95.1,67.0 100.9,67.0\" fill=\"#5ea6ab\"/>\n    <circle cx=\"98\" cy=\"72\" r=\"2.8\" fill=\"#24585e\"/>\n  </g>\n  <g class=\"lli\"><g transform=\"translate(63.5 72) scale(1.05) translate(-63.5 -72)\">\n    <g transform=\"rotate(-15 63.5 44)\"><mask id=\"c1\"><rect x=\"0\" y=\"0\" width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"56.0\" y=\"1.5\" width=\"15.0\" height=\"45\" rx=\"1.5\" fill=\"#000\"/><rect x=\"47.5\" y=\"-6.399999999999999\" width=\"32\" height=\"40\" fill=\"#000\"/></mask><circle cx=\"63.5\" cy=\"44\" r=\"13\" fill=\"#ffffff\" mask=\"url(#c1)\"/></g>\n    <g transform=\"rotate(-15 63.5 100)\"><mask id=\"c2\"><rect x=\"0\" y=\"0\" width=\"240\" height=\"180\" fill=\"#fff\"/><rect x=\"56.0\" y=\"97.5\" width=\"15.0\" height=\"45\" rx=\"1.5\" fill=\"#000\"/><rect x=\"47.5\" y=\"110.4\" width=\"32\" height=\"40\" fill=\"#000\"/></mask><circle cx=\"63.5\" cy=\"100\" r=\"13\" fill=\"#ffffff\" mask=\"url(#c2)\"/></g>\n    <rect x=\"57.5\" y=\"48\" width=\"12\" height=\"48\" fill=\"#ffffff\"/>\n  </g></g>\n</svg>\n  <p>Cargando Ingenier\u00eda + Mantenimiento\u2026</p>\n  <a class=\"btn\" id=\"ir\" href=\"#\" hidden>Entrar</a>\n</div>\n<div id=\"inst\">\n  <img src=\"icono-192.png\" alt=\"\">\n  <div><b id=\"instT\">Instalar I+M como app</b><small id=\"instS\">Queda en tu pantalla de inicio con su \u00edcono.</small></div>\n  <button class=\"btn\" id=\"instB\" type=\"button\">Instalar</button>\n  <button class=\"x\" id=\"instX\" type=\"button\" aria-label=\"Cerrar\">\u00d7</button>\n</div>\n<div id=\"fid\" role=\"dialog\" aria-live=\"polite\">\n  <button class=\"btn\" id=\"fidB\" type=\"button\"><svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 9v1M15 9v1M12 9v4h-1M9 16c1.8 1.3 4.2 1.3 6 0\"/></svg><span id=\"fidT\">Face ID</span></button>\n  <small id=\"fidE\"></small>\n  <span class=\"nota\" id=\"fidN\"></span>\n  <button class=\"lnk\" id=\"fidR\" type=\"button\" hidden>Activar Face ID de nuevo</button>\n</div>";

  // Única dirección de la app (la misma que ya tiene el equipo). Esta página no contiene datos ni claves.
  var APP = 'https://script.google.com/macros/s/AKfycbwx5dVRtiMdf1LwXNkhXkhAoQt-VVjq6vHr4d5jpD7unWbl6t6mJLILWZUEeo97Dxht3A/exec?app';
  // iPhone/iPad: Safari no guarda la clave ni el patrón dentro de una app instalada con la app de Google adentro.
  // Por eso en Apple se usa la página ios.html: mismo ícono, pero abre la app en Safari (ahí sí se guarda todo).
  var esIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var fr = document.getElementById('app'), carga = document.getElementById('carga'), ir = document.getElementById('ir');
  var ok = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec\?app$/.test(APP);
  var appWin = null, conPing = false, tCarga = null, nPing = 0, esperaPong = null, ocultaDesde = 0;
  // la cortina se quita cuando la app avisa que ya se dibujó; si no avisa (versión vieja del servidor o sin señal), se ofrece entrar directo
  function cargar(txt) {
    appWin = null; carga.classList.remove('off'); ir.hidden = true;
    carga.querySelector('p').textContent = txt || 'Cargando Ingeniería + Mantenimiento…';
    fr.src = 'about:blank'; setTimeout(function () { fr.src = APP; }, 50);
    clearTimeout(tCarga);
    tCarga = setTimeout(function () { if (!carga.classList.contains('off')) { ir.hidden = false; carga.querySelector('p').textContent = 'La app no respondió desde aquí. Entra directo:'; } }, 12000);
  }
  // v4.65: al volver de segundo plano (pantalla bloqueada, otra app), Android a veces descarta la app de adentro y queda todo negro.
  // Se le pregunta «¿sigues viva?» dos veces; si no contesta, se vuelve a cargar sola. Así nadie tiene que cerrar la app a mano.
  function ping() { if (!appWin) return; try { appWin.postMessage({ im: 'ping', n: ++nPing }, '*'); } catch (x) {} }
  function revisarViva() {
    if (!ok || esperaPong || !carga.classList.contains('off')) return;
    if (!appWin || appWin.closed) { cargar('Reconectando…'); return; }
    if (!conPing) return; // app de adentro aún sin esta función: no se arriesga una recarga
    ping();
    esperaPong = { a: setTimeout(ping, 2500), b: setTimeout(function () { esperaPong = null; cargar('Reconectando…'); }, 6000) };
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { ocultaDesde = Date.now(); return; }
    if (ocultaDesde && Date.now() - ocultaDesde > 3000) setTimeout(revisarViva, 300);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) setTimeout(revisarViva, 300); });
  if (ok) {
    ir.href = APP;
    cargar();
  } else {
    carga.querySelector('p').textContent = 'Falta configurar la dirección';
  }
  // la app pide recargar (botón ↻ adentro): se vuelve a pedir a Google desde aquí
  window.addEventListener('message', function (e) {
    var deGoogle = e.origin === 'https://script.google.com' || /\.googleusercontent\.com$/.test(e.origin);
    // memoria de la app (clave, patrón, preferencias): se guarda aquí, en el origen propio, porque en iPhone la app de adentro no puede guardar nada
    if (deGoogle && e.data && e.data.im === 'ls-get') {
      var d = {}; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf('app:') === 0) d[k.slice(4)] = localStorage.getItem(k); } } catch (x) {}
      var src = e.source, org = e.origin, enviado = false;
      var enviar = function (c) { if (enviado) return; enviado = true; try { src.postMessage({ im: 'ls-datos', datos: d, fid: !!c }, org); } catch (x) {} };
      fidCap.then(enviar, function () { enviar(false); }); setTimeout(function () { enviar(false); }, 1200);
    }
    if (deGoogle && e.data && e.data.im === 'fid-boton') { fidMostrar(e.data, e.source, e.origin); }
    if (deGoogle && e.data && e.data.im === 'fid-ocultar') { fidCerrar(); }
    if (deGoogle && e.data && e.data.im === 'ls-set') { try { localStorage.setItem('app:' + e.data.k, String(e.data.v)); } catch (x) {} }
    if (deGoogle && e.data && e.data.im === 'ls-del') { try { localStorage.removeItem('app:' + e.data.k); } catch (x) {} }
    // vibración: Chrome no deja vibrar a la app de adentro (va en un marco de Google), así que vibra esta página por ella
    if (deGoogle && e.data && e.data.im === 'vibrar' && navigator.vibrate) {
      var p = e.data.p; p = Array.isArray(p) ? p.slice(0, 10).map(function (n) { return Math.max(0, Math.min(1000, +n || 0)); }) : Math.max(0, Math.min(1000, +p || 0));
      try { navigator.vibrate(p); } catch (x) {}
    }
    if (deGoogle && e.data && e.data.im === 'listo') { appWin = e.source; carga.classList.add('off'); ir.hidden = true; clearTimeout(tCarga); ping(); }
    if (deGoogle && e.data && e.data.im === 'pong') { conPing = true; if (esperaPong) { clearTimeout(esperaPong.a); clearTimeout(esperaPong.b); esperaPong = null; } }
    if (deGoogle && e.data && e.data.im === 'recargar' && ok) { cargar(); }
    if (deGoogle && e.data && e.data.im === 'vp') { vistaRevisar(); } // la app avisa que se está escribiendo
  });
  // ---- v5.04: la pantalla no se «sube» al escribir ----
  // En iPad/iPhone, al escribir dentro de la app (sobre todo con teclado físico), Safari corría TODA esta página hacia arriba:
  // la ventana quedaba pegada arriba y el resto de la pantalla en negro. Aquí la página nunca queda corrida: se devuelve a su
  // lugar y la app ocupa siempre exactamente la parte visible (con el teclado en pantalla, lo que queda sobre él).
  var vv = window.visualViewport, raiz = document.documentElement, vT1 = null, vT2 = null, vT3 = null;
  function vistaAjustar() {
    if (vv && vv.scale && Math.abs(vv.scale - 1) > 0.02) return; // con zoom de dedos no se interviene
    var H = window.innerHeight, h = vv ? vv.height : H;
    var corrida = (vv && vv.offsetTop > 0.5) || window.pageYOffset > 0.5 || raiz.scrollTop > 0.5 || document.body.scrollTop > 0.5;
    if (corrida) { try { window.scrollTo(0, 0); } catch (x) {} raiz.scrollTop = 0; document.body.scrollTop = 0; }
    var off = vv ? Math.max(0, vv.offsetTop) : 0; // si el equipo no deja devolverla, la app se acomoda a lo que se ve
    raiz.style.setProperty('--vt', Math.round(off) + 'px');
    raiz.style.setProperty('--vh', H - h > 80 ? Math.round(h) + 'px' : '100%');
  }
  function vistaRevisar() { vistaAjustar(); clearTimeout(vT1); clearTimeout(vT2); clearTimeout(vT3); vT1 = setTimeout(vistaAjustar, 80); vT2 = setTimeout(vistaAjustar, 300); vT3 = setTimeout(vistaAjustar, 700); }
  if (vv) { vv.addEventListener('resize', vistaRevisar); vv.addEventListener('scroll', vistaRevisar); }
  window.addEventListener('scroll', vistaRevisar, { passive: true }); window.addEventListener('resize', vistaRevisar); window.addEventListener('orientationchange', vistaRevisar);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') vistaRevisar(); });
  vistaRevisar();
  // ---- v4.69: Face ID (iPhone/iPad) ----
  // Face ID entrega una llave (extensión PRF de WebAuthn) que la app usa para abrir la clave guardada cifrada en este equipo.
  // Aquí no se guarda ninguna clave: solo se pide Face ID y se le pasa la llave a la app de Google que lo pidió.
  var fidCap = Promise.resolve(false);
  if (esIOS && window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
    try { fidCap = PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(function () { return false; }); } catch (x) {}
  }
  var fidBox = document.getElementById('fid'), fidB = document.getElementById('fidB'), fidT = document.getElementById('fidT'), fidE = document.getElementById('fidE');
  var fidReq = null, fidN = document.getElementById('fidN'), fidR = document.getElementById('fidR');
  function b64(buf) { var u = new Uint8Array(buf), s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function ub64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function azar(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function fidMostrar(m, src, org) {
    fidReq = { n: m.n, modo: m.modo === 'activar' ? 'activar' : 'entrar', nombre: String(m.nombre || '').slice(0, 60), id: m.id || '', salt: m.salt || '', src: src, org: org };
    fidT.textContent = m.texto || 'Face ID'; fidE.textContent = ''; fidB.disabled = false; fidR.hidden = true; fidBox.classList.add('on');
    // al activar: la llave debe quedar en el llavero de Apple (Contraseñas); guardada en Chrome se puede perder al sincronizar
    fidN.textContent = fidReq.modo === 'activar' ? 'Si el iPad pregunta dónde guardar la llave de acceso, elige «Contraseñas».' : '';
    fidReq.auto = 0;
    // v4.70: al entrar se pide Face ID solo, sin tocar el botón (un toque menos). Si Safari no lo permite sin toque, queda el botón.
    if (fidReq.modo === 'entrar' && document.visibilityState === 'visible') setTimeout(function () { fidIniciar(true); }, 150);
  }
  function fidCerrar() { fidReq = null; fidBox.classList.remove('on'); fidE.textContent = ''; fidN.textContent = ''; fidR.hidden = true; }
  // v4.76: si el iPad dice que no hay llave guardada, se vuelve a activar (la app pide la clave una vez y crea una llave nueva)
  fidR.addEventListener('click', function () { fidResponder({ ok: false, err: 'rehacer' }); });
  function fidResponder(r) {
    var q = fidReq; if (!q) return; fidCerrar(); r.im = 'fid-res'; r.n = q.n;
    try { q.src.postMessage(r, q.org); } catch (x) {}
  }
  function fidPrf(cred) { var x = cred && cred.getClientExtensionResults ? cred.getClientExtensionResults() : {}; return x && x.prf ? x.prf : null; }
  fidB.addEventListener('click', function () { fidIniciar(false); });
  // al volver a la app se pide Face ID solo una vez más; si ya falló, queda el botón (no se repite la ventana del iPad)
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && fidReq && fidReq.modo === 'entrar' && !fidB.disabled && !fidReq.fallo) setTimeout(function () { fidIniciar(true); }, 400); });
  function fidIniciar(auto) {
    var q = fidReq; if (!q || fidB.disabled) return;
    if (auto && (q.fallo || q.auto >= 2)) return; q.auto += auto ? 1 : 0; var t0 = Date.now();
    fidB.disabled = true; fidE.textContent = '';
    var salt = ub64(q.salt), p;
    if (q.modo === 'activar') {
      p = navigator.credentials.create({ publicKey: {
        rp: { name: 'I+M Mantención', id: location.hostname },
        user: { id: azar(16), name: q.nombre || 'I+M', displayName: q.nombre || 'I+M' },
        challenge: azar(32),
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'required', requireResidentKey: true },
        hints: ['client-device'], attestation: 'none',
        timeout: 60000, extensions: { prf: { eval: { first: salt } } } } }).then(function (c) {
          var x = fidPrf(c);
          if (!x || (!x.enabled && !(x.results && x.results.first))) { fidResponder({ ok: false, err: 'sin-prf' }); return; }
          q.id = b64(c.rawId);
          if (x.results && x.results.first) { fidResponder({ ok: true, id: q.id, prf: b64(x.results.first) }); return; }
          // algunos equipos no entregan la llave al crear: se pide Face ID una vez más para obtenerla
          q.modo = 'confirmar'; fidT.textContent = 'Confirmar con Face ID'; fidE.textContent = 'Un paso más: confirma con Face ID.'; fidB.disabled = false;
        });
    } else {
      p = navigator.credentials.get({ publicKey: {
        challenge: azar(32), rpId: location.hostname, allowCredentials: [{ type: 'public-key', id: ub64(q.id) }],
        userVerification: 'required', timeout: 60000, extensions: { prf: { eval: { first: salt } } } } }).then(function (a) {
          var x = fidPrf(a);
          if (!x || !x.results || !x.results.first) { fidResponder({ ok: false, err: 'sin-prf' }); return; }
          fidResponder({ ok: true, id: q.id, prf: b64(x.results.first) });
        });
    }
    p.catch(function (er) {
      if (fidReq !== q) return;
      fidB.disabled = false;
      if (auto && Date.now() - t0 < 700) return; // Safari no dejó pedirlo sin toque: queda el botón, sin aviso
      q.fallo = true;
      // cerrar la ventana del iPad y «no hay llave guardada» llegan igual (NotAllowedError): se ofrecen ambas salidas
      if (q.modo === 'entrar' || q.modo === 'confirmar') {
        fidE.textContent = 'No se completó Face ID. Toca el botón para intentar otra vez.';
        if (q.modo === 'entrar') { fidN.textContent = 'Si el iPad dice que no tienes llave de acceso guardada:'; fidR.hidden = false; }
        return;
      }
      fidE.textContent = er && er.name === 'InvalidStateError' ? 'Ya existe una llave para este equipo. Toca para intentar otra vez.' : 'No se activó Face ID. Toca el botón para intentar otra vez.';
    });
  }
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
