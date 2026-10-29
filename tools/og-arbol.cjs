// 29/10 · la imagen para compartir (Eric): el árbol con sus raíces sobre la noche de su estación (antes, blanco), «Elevamos tu web con IA.» arriba, ajustado a 1200×630.
// Sale de src/pages/prueba/arbol-video.astro?og=1 (dev). Uso: node tools/og-arbol.cjs [url-base] [estación 0–3] [salida.jpg] [es|en]
// Las ocho de la web: public/og/<otono|invierno|primavera|verano>[-en].jpg (Base.astro elige la de la estación al compilar)
// (0 otoño · 1 invierno · 2 primavera · 3 verano; Playwright del entorno de Ship Studio en el Mac de Eric, como tools/r156-og.cjs)
const pw = require('/Users/ericruiz/.ship-studio/playwright-env/node_modules/playwright-core');
const [BASE = 'http://localhost:3177', EST = '0', OUT = 'public/og/otono.jpg', LANG = 'es'] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch({ headless: true });
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })).newPage();
  p.on('console', (m) => m.type() === 'error' && console.log('consola:', m.text()));
  await p.goto(`${BASE}/prueba/arbol-video?og=1&est=${EST}&lang=${LANG}`, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__listo);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(7500); // gota + 3,6 s de crecimiento + respiro
  // a doble densidad (el tramado sale fino) y reducido a 1200×630 con lanczos
  const png = OUT.replace(/\.jpg$/, '.2x.png');
  await p.screenshot({ path: png });
  await b.close();
  require('child_process').execSync(`ffmpeg -y -loglevel error -i ${png} -vf scale=1200:630:flags=lanczos -q:v 2 ${OUT}`);
  require('fs').unlinkSync(png);
  console.log(OUT);
})();
