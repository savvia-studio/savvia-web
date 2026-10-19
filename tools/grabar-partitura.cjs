// Graba la película de «savvia agentic» (LaPartitura) como vídeo vertical para MÓVIL: el iPhone se quedaba sin memoria con la escena viva.
// La escena es una función pura del tiempo (window.__partitura.ir(t)), así que se graba fotograma a fotograma, exacta.
// Uso: node tools/grabar-partitura.cjs <otono|invierno|primavera|verano> <es|en> [url-base=http://localhost:4321] [fps=30]
// Salida: public/media/partitura/partitura-<estacion>-<lang>.mp4 (+ .jpg de póster)
const { chromium } = require('/Users/ericruiz/.ship-studio/playwright-env/node_modules/playwright-core');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [est = 'otono', lang = 'es', base = 'http://localhost:4321', fps = '30'] = process.argv.slice(2);
const FPS = +fps, VEL = 0.62, DSF = 3;
(async () => {
  const out = path.join(__dirname, '..', 'public', 'media', 'partitura'); fs.mkdirSync(out, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), `partitura-${est}-${lang}-`));
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: DSF, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto(`${base}${lang === 'en' ? '/en/' : '/'}?carga=0&grabando=1`, { waitUntil: 'load' });
  await p.addStyleTag({ content: '[data-nav],.cf,.cf-btn,.cf-panel,.carriles,[data-carriles]{display:none!important} .cine{-webkit-mask-image:none!important;mask-image:none!important}' });
  await p.evaluate((e) => { const h = document.documentElement; h.dataset.estacion = e; dispatchEvent(new CustomEvent('savvia:estacion', { detail: { n: ['otono', 'invierno', 'primavera', 'verano'].indexOf(e), origen: 'grabar' } })); }, est);
  // fondo plano idéntico al de la sección (en vídeo no hay transparencia): el color que la página pinta en esta estación
  const fondo = await p.evaluate(() => getComputedStyle(document.querySelector('[data-partitura]')).backgroundColor);
  await p.addStyleTag({ content: `[data-partitura]{background:${fondo}!important;background-image:none!important}.cine{background:${fondo}!important}` });
  console.log('fondo', fondo);
  const cine = p.locator('[data-partitura] [data-cine]').first();
  await cine.scrollIntoViewIfNeeded(); await p.waitForTimeout(3500);
  await p.evaluate(() => document.fonts.ready);
  const LOOP = await p.evaluate(() => window.__partitura.LOOP);
  const dur = LOOP / VEL, N = Math.round(dur * FPS);
  console.log(est, lang, 'LOOP', LOOP, 'dur', dur.toFixed(2), 's', N, 'fotogramas');
  const caja = await cine.boundingBox();
  console.log('caja', JSON.stringify(caja));
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    await p.evaluate((t) => window.__partitura.ir(t), (i / FPS) * VEL);
    await cine.screenshot({ path: path.join(tmp, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    if (i % 100 === 0) console.log(est, lang, i, '/', N, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  await b.close();
  const f = path.join(out, `partitura-${est}-${lang}`);
  // dimensiones pares; H.264 High, yuv420p, sin audio; faststart para empezar a reproducir sin bajarlo entero
  const COM = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, '%05d.jpg'), '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2:in_range=pc:out_range=tv:out_color_matrix=bt709', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-pix_fmt', 'yuv420p', '-an'];
  // H.264 (respaldo, lo reproduce todo) y HEVC (Safari/iOS: misma nitidez con menos MB; la etiqueta hvc1 es la que Safari exige)
  execFileSync('ffmpeg', [...COM, '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '24', '-movflags', '+faststart', f + '.mp4']);
  execFileSync('ffmpeg', [...COM, '-c:v', 'libx265', '-preset', 'slow', '-crf', '27', '-tag:v', 'hvc1', '-x265-params', 'log-level=error', '-movflags', '+faststart', f + '-hevc.mp4']);
  fs.copyFileSync(path.join(tmp, String(Math.round(N * 0.7)).padStart(5, '0') + '.jpg'), f + '.jpg');
  console.log('listo', f, 'h264', (fs.statSync(f + '.mp4').size / 1e6).toFixed(2) + ' MB', 'hevc', (fs.statSync(f + '-hevc.mp4').size / 1e6).toFixed(2) + ' MB');
  fs.rmSync(tmp, { recursive: true, force: true });
})();
