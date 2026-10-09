// RONDA 152 · DETALLES de los casos, de cerca y a densidad 2: cada uno enseña UNA pieza de la web real (un componente, una interacción, un efecto)
// para ponerla junto al texto que la explica. Graba con el screencast de Chrome (CDP) a 2× y recorta la caja de la pieza.
// node tools/r152/detalle.cjs <slug> [nombre]      (la lista, en tools/r152/detalles.json)
// Acciones: mirar (quieto, lo que se mueve solo) · bajar (scroll de dy px durante la toma, el recorte fijo en pantalla: efectos atados al scroll)
//           · pasar (el cursor recorre los elementos «sobre») · pulsar (clic en «sobre», uno tras otro)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const G = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/reel/grabar-comun.cjs');
const W = require('./webs.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FF = '/opt/homebrew/bin/ffmpeg', FPS = 30;
const RAIZ = path.join(__dirname, '../../public/media/obra');
const TMP = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/4a330437-fe35-417c-bed0-2d5af9993a14/scratchpad/grab';
const LISTA = JSON.parse(fs.readFileSync(path.join(__dirname, 'detalles.json'), 'utf8'));

async function scrollA(p, y) { await p.evaluate((yy) => { const L = window.__lenis || window.lenis; if (L?.scrollTo) L.scrollTo(yy, { immediate: true, force: true }); document.scrollingElement.scrollTop = yy; }, y); }

async function grabar(b, slug, d) {
  const web = W[d.web || slug], vw = d.vp?.[0] || 1440, vh = d.vp?.[1] || 900, movil = !!d.movil;
  const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, userAgent: movil ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' : userAgent, isMobile: movil, hasTouch: movil });
  if (web.marca) await B.preparar(ctx, web.marca);
  const p = await ctx.newPage();
  await p.goto(d.url || web.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(d.espera0 ?? 3500); await G.limpiar(p);
  // recorrer la página una vez (lo que entra al hacer scroll ya está montado)
  if (d.recorrer !== false) { const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < Math.min(H, (d.y ?? 0) + 3000); y += 500) { await scrollA(p, y); await p.waitForTimeout(120); } }
  // dónde: «y» absoluta, o el elemento que contiene «texto» (o «sel») y su caja (subiendo «sube» niveles)
  let y0 = d.y ?? 0;
  if (d.texto || d.sel) {
    y0 = await p.evaluate(({ texto, sel, n }) => {
      let el = null;
      if (sel) el = [...document.querySelectorAll(sel)][n || 0];
      else { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; const hits = []; while ((t = w.nextNode())) if (t.nodeValue.replace(/\s+/g, ' ').includes(texto) && t.parentElement.getBoundingClientRect().height > 0) hits.push(t.parentElement); el = hits[n || 0]; }
      if (!el) return null; window.__det = el; return Math.round(el.getBoundingClientRect().top + scrollY);
    }, { texto: d.texto, sel: d.sel, n: d.n });
    if (y0 == null) { console.log(slug, d.nombre, 'NO ENCONTRADO', d.texto || d.sel); await ctx.close(); return; }
  }
  await scrollA(p, Math.max(0, y0 - (d.arriba ?? 120))); await p.waitForTimeout(d.espera ?? 1500); await G.limpiar(p);
  // la caja que se recorta (en px CSS de la ventana): «caja» fija [x,y,w,h], o la del elemento subiendo niveles, con margen, al formato pedido
  let caja = d.caja;
  if (!caja && (d.texto || d.sel)) caja = await p.evaluate(({ sube, margen }) => {
    let el = window.__det; for (let i = 0; i < (sube || 0); i++) el = el.parentElement;
    const r = el.getBoundingClientRect(); return [r.left - margen, r.top - margen, r.width + 2 * margen, r.height + 2 * margen];
  }, { sube: d.sube, margen: d.margen ?? 24 });
  if (!caja) caja = [0, 0, vw, vh];
  let [x, y, w, h] = caja; const fr = d.formato ? d.formato[0] / d.formato[1] : 4 / 3;
  if (w / h > fr) { const nh = w / fr; y -= (nh - h) / 2; h = nh; } else { const nw = h * fr; x -= (nw - w) / 2; w = nw; }
  if (w > vw) { w = vw; h = w / fr; } if (h > vh) { h = vh; w = h * fr; }
  x = Math.max(0, Math.min(vw - w, x)); y = Math.max(0, Math.min(vh - h, y));
  // grabar: el screencast de Chrome sin ventana sale a 1× (1440 px aunque la densidad sea 2), así que se toman CAPTURAS RECORTADAS en bucle (~24 por
  // segundo a 2×) con su hora; la acción (scroll, cursor, clics) corre a la vez y luego se remuestrea a 30 fps
  const frames = [], dur = (d.dur ?? 5) * 1000, clip = { x, y, width: w, height: h };
  let accion = Promise.resolve();
  if (d.accion === 'bajar') {
    accion = p.evaluate(([dy, D]) => new Promise((ok) => { const a = scrollY, z = a + dy, t0 = performance.now(), L = window.__lenis || window.lenis;
      const paso = (t) => { const k = Math.min(1, (t - t0) / D), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, yy = a + (z - a) * e;
        if (L?.scrollTo) L.scrollTo(yy, { immediate: true, force: true }); else document.scrollingElement.scrollTop = yy; if (k < 1) requestAnimationFrame(paso); else ok(); };
      requestAnimationFrame(paso); }), [d.dy ?? 800, dur * (d.frac ?? 0.8)]);
  } else if (d.accion === 'pasar' || d.accion === 'pulsar') {
    accion = (async () => {
      const objs = d.textos ? (await Promise.all(d.textos.map((t) => p.getByText(t, { exact: d.exacto !== false }).first().elementHandle({ timeout: 2000 }).catch(() => null)))).filter(Boolean) : (await Promise.all((await p.$$(d.sobre)).map(async (o) => { const r = await o.boundingBox(); return r && r.width > 0 && r.y > 0 && r.y < vh ? o : null; }))).filter(Boolean).slice(0, d.max || 8); const pausa = Math.max(500, (dur - 600) / Math.max(1, objs.length));
      await p.waitForTimeout(400);
      for (const o of objs) { const r = await o.boundingBox(); if (!r) continue; await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2, { steps: 14 }); if (d.accion === 'pulsar') await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(pausa); }
    })();
  }
  const t0 = Date.now();
  while (Date.now() - t0 < dur) { const buf = await p.screenshot({ clip, type: 'jpeg', quality: 90 }); frames.push({ t: (Date.now() - t0) / 1000, buf }); }
  await accion.catch(() => {});
  await ctx.close();
  if (frames.length < 5) { console.log(slug, d.nombre, 'sin fotogramas'); return; }
  const dir = path.join(TMP, `${slug}-${d.nombre}`); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const N = Math.floor(frames[frames.length - 1].t * FPS); let j = 0;
  for (let i = 0; i < N; i++) { const t = i / FPS; while (j + 1 < frames.length && frames[j + 1].t <= t) j++; fs.writeFileSync(path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), frames[j].buf); }
  const out = path.join(RAIZ, slug, d.nombre), ancho = Math.min(1440, Math.round(w * 2) - (Math.round(w * 2) % 2));
  const recorte = `scale=${ancho}:-2`;
  execSync(`${FF} -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -vf "${recorte}" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart ${out}.mp4`);
  execSync(`${FF} -y -loglevel error -sseof -0.4 -i ${out}.mp4 -frames:v 1 -q:v 4 ${out}.jpg`);
  console.log(slug, d.nombre, `${frames.length}→${N} fot. (${(frames.length / (dur / 1000)).toFixed(1)}/s)`, `caja ${[x, y, w, h].map(Math.round).join(',')}`, Math.round(fs.statSync(out + '.mp4').size / 1024) + ' KB');
}

(async () => {
  const [slug, solo] = process.argv.slice(2);
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args.filter((a) => !a.startsWith('--window-size')), '--window-size=1440,900'] });
  for (const d of LISTA[slug] || []) { if (solo && d.nombre !== solo) continue; try { await grabar(b, slug, d); } catch (e) { console.log(slug, d.nombre, 'ERROR', e.message); } }
  await b.close();
})();
