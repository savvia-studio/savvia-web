// RONDA 266 · «la parte de motion, hacer los motion más realistas a lo que tenemos en la web»: cada efecto del brandbook (Movimiento) GRABADO de la web
// real en Chrome (vídeo de Playwright, 1280 × 720) y recortado a su zona con ffmpeg → public/media/brandbook/movimiento/<id>.mp4 (bucle, mudo, 720 px).
// node tools/r266-motion/grabar.cjs [id…]   (con el servidor de desarrollo en :4332)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const TMP = path.join(__dirname, 'tmp'), OUT = 'public/media/brandbook/movimiento';
fs.mkdirSync(TMP, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:4332';
// 24/10 · «en sistema, que todo cambie con la estación»: SAVVIA_EST=invierno|primavera|verano|otono (por defecto otoño) → <id>-<estación>.mp4
const ESTA = process.env.SAVVIA_EST || 'otono';
const caja = async (p, sel) => p.$eval(sel, (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
const ESCENAS = {
  // el roble del hero se dibuja y se pinta al cargar
  roble: { url: `/?carga=0&estacion=${ESTA}`, async run(p, m) { m('a'); await p.waitForTimeout(5200); m('b'); return { x: 290, y: 330, w: 700, h: 390 }; } },
  // cambio de estación: la estación nueva se pinta encima desde la base del tronco
  estacion: { url: `/?carga=0&estacion=${ESTA}`, async run(p, m) { await p.waitForTimeout(6000); m('a'); await p.$eval('[data-estacion-ic]', (b) => b.click()); await p.waitForTimeout(3400); m('b'); return { x: 290, y: 330, w: 700, h: 390 }; } },
  // entre secciones: la sección que llega asoma como una gota que se ensancha (data-sube), con el scroll
  secciones: { url: `/?carga=0&estacion=${ESTA}`, async run(p, m) {
    const y = await p.$eval('#estudio', (el) => el.getBoundingClientRect().top + scrollY);
    await p.evaluate((t) => window.scrollTo(0, t - 900), y); await p.waitForTimeout(1500); m('a');
    for (let i = 0; i < 46; i++) { await p.mouse.wheel(0, 14); await p.waitForTimeout(50); }
    await p.waitForTimeout(500); m('b'); return { x: 0, y: 0, w: 1280, h: 720 }; } },
  // la savia del CTA: llena el botón desde donde entra el cursor
  cta: { url: `/sistema?carga=0&estacion=${ESTA}`, async run(p, m) {
    const el = await p.$('#descargas .btn-primary'); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
    const b = await el.boundingBox(); await p.mouse.move(b.x - 60, b.y + b.height * 0.3); await p.waitForTimeout(300); m('a');
    await p.mouse.move(b.x + b.width * 0.2, b.y + b.height * 0.5, { steps: 8 }); await p.waitForTimeout(1500);
    await p.mouse.move(b.x + b.width + 80, b.y + b.height * 0.7, { steps: 10 }); await p.waitForTimeout(1100); m('b');
    const w = Math.max(b.width * 1.9, 460); return { x: Math.max(0, b.x + b.width / 2 - w / 2), y: b.y + b.height / 2 - w * 0.28, w, h: w * 0.56 }; } },
  // el tiempo del pie: caen las hojas y se posan sobre el prado
  tiempo: { url: `/?carga=0&estacion=${ESTA}`, async run(p, m) {
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000);
    await p.addStyleTag({ content: '[data-pie] .contacta, [data-pie] .contacta *, [data-pie] [data-tiempo], [data-pie] .contenido { opacity: 0 !important; }' });
    m('a'); await p.waitForTimeout(6000); m('b');
    const r = await caja(p, '[data-paisaje]'); return { x: 0, y: Math.max(0, r.y + r.h * 0.34), w: 1280, h: Math.min(720 - Math.max(0, r.y + r.h * 0.34), 460) }; } },
  // 28/10 · Catálogo: «el contáctanos, que se vea animado para ver cómo caen las hojas, lo mismo para el 404, en las 4 estaciones» → public/media/sistema/catalogo/video/
  'pie': { out: 'public/media/sistema/catalogo/video', ancho: 960, url: `/?carga=0&estacion=${ESTA}`, async run(p, m) {
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000);
    m('a'); await p.waitForTimeout(7000); m('b'); return { x: 0, y: 0, w: 1280, h: 720 }; } },
  '404': { out: 'public/media/sistema/catalogo/video', ancho: 960, url: `/esta-pagina-no-existe?carga=0&estacion=${ESTA}`, async run(p, m) {
    await p.waitForTimeout(2500); m('a'); await p.waitForTimeout(7000); m('b'); return { x: 0, y: 0, w: 1280, h: 720 }; } },
};
(async () => {
  const pedidas = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ESCENAS);
  const b = await chromium.launch(launchOpts);
  for (const id of pedidas) {
    const E = ESCENAS[id];
    const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent, recordVideo: { dir: TMP, size: { width: 1280, height: 720 } } });
    const p = await ctx.newPage(); const t0 = Date.now(), marcas = {};
    await p.goto(URL + E.url, { waitUntil: 'load' });
    // fuera lo flotante que no es el efecto (el botón redondo, «¿Hablamos?», la barra): se esconde todo lo fijo
    await p.evaluate(() => { const ocultar = () => { for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); if (cs.position === 'fixed' && !el.closest('[data-pie]') && !el.matches('[data-sube-capa], .sube-capa, canvas')) { el.style.visibility = 'hidden'; el.style.opacity = '0'; } } }; ocultar(); const iv = setInterval(ocultar, 250); setTimeout(() => clearInterval(iv), 20000); });
    const zona = await E.run(p, (k) => { marcas[k] = (Date.now() - t0) / 1000; });
    const v = await p.video().path(); await ctx.close();
    const z = { x: Math.max(0, Math.round(zona.x / 2) * 2), y: Math.max(0, Math.round(zona.y / 2) * 2) };
    z.w = Math.min(1280 - z.x, Math.round(zona.w / 2) * 2); z.h = Math.min(720 - z.y, Math.round(zona.h / 2) * 2);
    const dur = (marcas.b - marcas.a).toFixed(2);
    const DIR = E.out || OUT; fs.mkdirSync(DIR, { recursive: true });
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(marcas.a), '-i', v, '-t', dur, '-vf', `crop=${z.w}:${z.h}:${z.x}:${z.y},scale=${E.ancho || 720}:-2,fps=30`, '-an', '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${DIR}/${id}-${ESTA}.mp4`]);
    if (E.out) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', `${DIR}/${id}-${ESTA}.mp4`, '-frames:v', '1', '-q:v', '4', `${DIR}/${id}-${ESTA}.jpg`]); // el póster
    console.log(id, dur + ' s', `${z.w}×${z.h}`, Math.round(fs.statSync(`${DIR}/${id}-${ESTA}.mp4`).size / 1024) + ' KB');
  }
  await b.close();
})();
