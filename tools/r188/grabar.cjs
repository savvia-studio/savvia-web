// RONDA 188 · Andoni: «que todos los vídeos se vean con buena calidad; las isometrías como que vibran». Causa: el grabador de la ronda 154 hacía
// capturas a 2× en bucle y salían 6–10 por segundo: al rellenar hasta 30 fps se repetían fotogramas a saltos (vibra) y además iba a CRF 23–26.
// Ahora la página corre a CÁMARA LENTA mientras se graba (reloj propio: performance.now, Date.now, rAF y temporizadores al ritmo «lento», y las
// animaciones CSS/WAAPI con Animation.setPlaybackRate): cada captura cae en su hora exacta de la página y a 30 fps no se repite ninguna. CRF 18.
// Mismas opciones que tools/r154/grabar.cjs (lista: tools/r188/lista.json, o la de la 154) + «lento» (0,2 por defecto) y «crf».
// node tools/r188/grabar.cjs <slug> [nombre,…] [lista.json]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const G = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/reel/grabar-comun.cjs');
const W = require('../r152/webs.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FF = '/opt/homebrew/bin/ffmpeg', FPS = 30;
const RAIZ = path.join(__dirname, '../../public/media/obra');
const TMP = require('os').tmpdir() + '/grab188';
const LISTA = JSON.parse(fs.readFileSync(process.argv[4] || path.join(__dirname, 'lista.json'), 'utf8'));
// el reloj de la página, regulable: arranca a 1 y se pone a «lento» justo antes de grabar (las librerías guardan Date.now al cargar: va antes que ellas)
const RELOJ = () => { const rP = performance.now.bind(performance), rD = Date.now, d0 = rD() - rP(); let r0 = rP(), v0 = r0, vel = 1;
  const now = () => v0 + (rP() - r0) * vel;
  window.__ponerVel = (k) => { v0 = now(); r0 = rP(); vel = k; document.querySelectorAll('video').forEach((v) => (v.playbackRate = k)); };
  performance.now = now; Date.now = () => Math.round(d0 + now());
  const raf = window.requestAnimationFrame.bind(window); window.requestAnimationFrame = (cb) => raf(() => cb(now()));
  const sT = window.setTimeout.bind(window), sI = window.setInterval.bind(window);
  window.setTimeout = (f, d, ...a) => sT(f, (d || 0) / vel, ...a); window.setInterval = (f, d, ...a) => sI(f, (d || 0) / vel, ...a); };
const MOVIL_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

async function scrollA(p, y) { await p.evaluate((yy) => { const L = window.__lenis || window.lenis; if (L?.scrollTo) L.scrollTo(yy, { immediate: true, force: true }); document.scrollingElement.scrollTop = yy; }, y); }

// la barra fija de la web (y cualquier cosa fija arriba) estorba en un primer plano: fuera, salvo que esté dentro de la pieza
async function sinFijos(p) {
  await p.evaluate(() => {
    // se repite cada 150 ms durante la toma: hay barras que se vuelven a pintar (se esconden al bajar y reaparecen al parar)
    const pasa = () => { const det = window.__det;
    document.querySelectorAll('body *').forEach((e) => {
      const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
      if (det && (e.contains(det) || det.contains(e))) return;
      const r = e.getBoundingClientRect();
      if (r.height > innerHeight * 0.6) return; // una capa a pantalla completa (fondos) no es una barra
      e.style.setProperty('visibility', 'hidden', 'important');
    }); };
    // y la cabecera de la web, aunque aún no sea fija (hay barras que solo se fijan al bajar)
    const cab = () => document.querySelectorAll('header, body > nav, [class*="navbar" i], [class*="site-header" i]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < 12 && r.height < 160 && r.width > innerWidth * 0.5 && !(window.__det && e.contains(window.__det))) e.style.setProperty('visibility', 'hidden', 'important'); });
    pasa(); cab(); setInterval(() => { pasa(); cab(); }, 150);
  });
}

async function grabar(b, slug, d) {
  const web = W[d.web || slug], movil = !!d.movil, vw = d.vp?.[0] || (movil ? 390 : 1440), vh = d.vp?.[1] || (movil ? 844 : 900);
  const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: d.cast ? 1 : 2, userAgent: movil ? MOVIL_UA : userAgent, isMobile: movil, hasTouch: movil });
  if (web.marca) await B.preparar(ctx, web.marca);
  await ctx.addInitScript(RELOJ);
  const p = await ctx.newPage();
  await p.goto(d.url || web.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  // «zoom»: la web maquetada a 1440 px y pintada a 1920 (el screencast sale a 1×: así la toma fluida tiene más píxeles sin cambiar la maqueta)
  if (d.zoom) await p.evaluate((z) => { document.documentElement.style.zoom = String(z); dispatchEvent(new Event('resize')); }, d.zoom);
  await p.waitForTimeout(d.espera0 ?? 3500); await G.limpiar(p);
  if (d.recorrer !== false) { const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < Math.min(H, (d.y ?? 0) + 3000); y += 400) { await scrollA(p, y); await p.waitForTimeout(140); } }
  let y0 = d.y ?? 0;
  if (d.texto || d.sel) {
    y0 = await p.evaluate(({ texto, sel, n, sube, contiene }) => {
      let el = null;
      if (sel) el = [...document.querySelectorAll(sel)].filter((e) => !contiene || e.textContent.replace(/\s+/g, ' ').includes(contiene))[n || 0];
      else { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; const hits = []; while ((t = w.nextNode())) if (t.nodeValue.replace(/\s+/g, ' ').includes(texto) && t.parentElement.getBoundingClientRect().height > 0) hits.push(t.parentElement); el = hits[n || 0]; }
      if (!el) return null; window.__detTxt = el.textContent.trim().slice(0, 40); for (let i = 0; i < (sube || 0); i++) el = el.parentElement; window.__det = el; return Math.round(el.getBoundingClientRect().top + scrollY);
    }, { texto: d.texto, sel: d.sel, n: d.n, sube: d.sube, contiene: d.contiene });
    if (y0 == null) { console.log(slug, d.nombre, 'NO ENCONTRADO', d.texto || d.sel); await ctx.close(); return; }
    console.log(slug, d.nombre, '→', await p.evaluate(() => window.__detTxt), y0);
  }
  const Z = d.zoom || 1; // con «zoom», el scroll de la página va en píxeles ya ampliados
  await scrollA(p, Math.max(0, y0 - (d.arriba ?? 120)) * (d.texto || d.sel ? 1 : Z)); await p.waitForTimeout(d.espera ?? 1800); await G.limpiar(p);
  if (d.sinFijos === 'botones') await p.evaluate(() => document.querySelectorAll('body *').forEach((e) => { const cs = getComputedStyle(e), r = e.getBoundingClientRect(); if (cs.position === 'fixed' && r.width < 90 && r.height < 90 && r.bottom > innerHeight - 160) e.style.setProperty('visibility', 'hidden', 'important'); }));
  else if (d.sinFijos !== false) await sinFijos(p);
  let caja = d.caja && d.zoom ? d.caja.map((v) => v * d.zoom) : d.caja;
  if (!caja && (d.texto || d.sel)) caja = await p.evaluate((margen) => { const r = window.__det.getBoundingClientRect(); return [r.left - margen, r.top - margen, r.width + 2 * margen, r.height + 2 * margen]; }, d.margen ?? 32);
  if (!caja) caja = [0, 0, vw, vh];
  let [x, y, w, h] = caja; const fr = d.formato ? d.formato[0] / d.formato[1] : w / h;
  if (w / h > fr) { const nh = w / fr; y -= (nh - h) / 2; h = nh; } else { const nw = h * fr; x -= (nw - w) / 2; w = nw; }
  if (w > vw) { w = vw; h = w / fr; } if (h > vh) { h = vh; w = h * fr; }
  x = Math.max(0, Math.min(vw - w, x)); y = Math.max(0, Math.min(vh - h, y));
  const clip = { x, y, width: w, height: h };
  const out = path.join(RAIZ, slug, d.nombre);
  if (d.foto) {
    const png = path.join(TMP, `${slug}-${d.nombre}.png`); fs.mkdirSync(TMP, { recursive: true });
    await p.screenshot({ path: png, clip }); await ctx.close();
    const sharp = require('sharp'), ancho = Math.min(d.ancho || 2400, Math.round(w * 2));
    await sharp(png).resize({ width: ancho }).webp({ quality: 80 }).toFile(out + '.webp');
    console.log(slug, d.nombre, 'foto', `caja ${[x, y, w, h].map(Math.round).join(',')}`, Math.round(fs.statSync(out + '.webp').size / 1024) + ' KB');
    return;
  }
  // la toma: capturas recortadas en bucle con su hora (el screencast sin ventana sale a 1×); la acción arranca tras «hold»
  const frames = [], hold = (d.hold ?? 0.8) * 1000, dur = (d.dur ?? 5) * 1000, holdFin = (d.holdFin ?? d.hold ?? 0.8) * 1000, total = hold + dur + holdFin;
  const K = d.lento ?? 0.2, cdpA = await ctx.newCDPSession(p);
  await cdpA.send('Animation.enable').catch(() => {}); await cdpA.send('Animation.setPlaybackRate', { playbackRate: K }).catch(() => {});
  await p.evaluate((k) => window.__ponerVel(k), K);
  // «salto» (ronda 188): ya a cámara lenta, salta a otra altura justo antes de grabar: lo que dispara esa altura (una ilustración que se construye)
  // arranca desde cero en el primer fotograma, sin el relevo de lo anterior
  if (d.salto !== undefined) { await scrollA(p, d.salto); await p.waitForTimeout(40); }
  let accion = Promise.resolve();
  const t0 = Date.now();
  const lanzar = async () => {
    await p.waitForTimeout(hold / K);
    if (d.accion === 'bajar') {
      await p.evaluate(([dy, D, lin]) => new Promise((ok) => { const a = scrollY, z = a + dy, t1 = performance.now(), L = window.__lenis || window.lenis;
        const paso = (t) => { const k = Math.min(1, (t - t1) / D), e = lin ? k : k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, yy = a + (z - a) * e;
          if (L?.scrollTo) L.scrollTo(yy, { immediate: true, force: true }); else document.scrollingElement.scrollTop = yy; if (k < 1) requestAnimationFrame(paso); else ok(); };
        requestAnimationFrame(paso); }), [(d.dy ?? 600) * Z, dur, !!d.lineal]); // «lineal»: a velocidad constante (los recorridos de página entera)
    } else if (d.accion === 'pasar' || d.accion === 'pulsar') {
      const objs = d.textos ? (await Promise.all(d.textos.map((t) => p.getByText(t, { exact: d.exacto !== false }).first().elementHandle({ timeout: 2000 }).catch(() => null)))).filter(Boolean) : (await Promise.all((await p.$$(d.sobre)).map(async (o) => { const r = await o.boundingBox(); return r && r.width > 0 && r.y > 0 && r.y < vh ? o : null; }))).filter(Boolean).slice(0, d.max || 8);
      const pausa = Math.max(500, dur / Math.max(1, objs.length)) / K;
      for (const o of objs) { const r = await o.boundingBox(); if (!r) continue; await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2, { steps: Math.round(14 / K) }); if (d.accion === 'pulsar') await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(pausa); }
      if (d.salir !== false) await p.mouse.move(vw - 4, 4, { steps: Math.round(10 / K) });
    }
  };
  accion = lanzar();
  if (d.cast) {
    // «cast»: la ventana entera a 1× con el screencast de Chrome (fluido, ~60 fps); para portadas a 1920 px de viewport. El recorte, en ffmpeg.
    const cdp = await ctx.newCDPSession(p), c0 = Date.now() / 1000;
    cdp.on('Page.screencastFrame', (f) => { frames.push({ t: (f.metadata.timestamp - c0) * K, buf: Buffer.from(f.data, 'base64') }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, everyNthFrame: 1 });
    await p.waitForTimeout((total + 300) / K); await cdp.send('Page.stopScreencast');
    // el primer fotograma del screencast puede ser uno viejo (con la barra aún puesta): se tiran los primeros 300 ms
    const f0 = (frames[0]?.t ?? 0) + 0.3; const viejos = frames.filter((f) => f.t < f0); const ult = viejos[viejos.length - 1];
    frames.splice(0, viejos.length); frames.forEach((f) => (f.t = Math.max(0, f.t - f0))); if (ult && viejos.length > 1) frames.unshift({ t: 0, buf: ult.buf });
    if (frames.length) frames.push({ t: total / 1000, buf: frames[frames.length - 1].buf }); // el screencast solo manda fotogramas cuando algo cambia: se sostiene el último
  } else while ((Date.now() - t0) * K < total) { const ta = Date.now(); const buf = await p.screenshot({ clip, type: 'jpeg', quality: 95 }); frames.push({ t: ((ta + Date.now()) / 2 - t0) * K / 1000, buf }); }
  await accion.catch(() => {});
  await ctx.close();
  // «desde» (ronda 188): se tira lo que pasa antes de ese segundo de página (p. ej. lo anterior que aún se desvanece tras el «salto»)
  if (d.desde) { const f0 = frames.filter((f) => f.t < d.desde); frames.splice(0, f0.length); frames.forEach((f) => (f.t -= d.desde)); }
  if (frames.length < 2) { console.log(slug, d.nombre, 'sin fotogramas'); return; }
  const dir = path.join(TMP, `${slug}-${d.nombre}`); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const N = Math.floor(frames[frames.length - 1].t * FPS); let j = 0;
  for (let i = 0; i < N; i++) { const t = i / FPS; while (j + 1 < frames.length && frames[j + 1].t <= t) j++; fs.writeFileSync(path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), frames[j].buf); }
  const k = d.cast ? 1 : 2, ancho = Math.min(d.ancho || 1920, Math.round(w * k) - (Math.round(w * k) % 2));
  const pre = d.cast ? `crop=${Math.round(w)}:${Math.round(h)}:${Math.round(x)}:${Math.round(y)},` : '';
  const vf = d.ida ? `${pre}scale=${ancho}:-2,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0` : `${pre}scale=${ancho}:-2`;
  execSync(`${FF} -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -filter_complex "${vf}" -an -c:v libx264 -crf ${d.crf ?? 18} -preset slow -pix_fmt yuv420p -movflags +faststart ${out}.mp4`);
  execSync(`${FF} -y -loglevel error -i ${out}.mp4 -frames:v 1 -q:v 3 ${out}.jpg`);
  console.log(slug, d.nombre, `${frames.length}→${N} fot. (${(frames.length / (total / 1000)).toFixed(1)} por s de página)`, `caja ${[x, y, w, h].map(Math.round).join(',')}`, Math.round(fs.statSync(out + '.mp4').size / 1024) + ' KB');
}

(async () => {
  const [slug, solo] = process.argv.slice(2);
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args.filter((a) => !a.startsWith('--window-size')), '--window-size=1920,1200'] });
  for (const d of LISTA[slug] || []) { if (solo && !solo.split(',').includes(d.nombre)) continue; try { await grabar(b, slug, d); } catch (e) { console.log(slug, d.nombre, 'ERROR', e.message); } }
  await b.close();
})();
