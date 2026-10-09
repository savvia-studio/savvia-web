// RONDA 152 · sondeo de cada web real: titulares con su Y y una captura de página entera (reducida) para elegir los DETALLES de los casos.
// node tools/r152/sondeo.cjs <clave>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const G = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/reel/grabar-comun.cjs');
const OUT = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/4a330437-fe35-417c-bed0-2d5af9993a14/scratchpad/sondeo';
const W = require('./webs.cjs');
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const k = process.argv[2], s = W[k];
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: s.w || 1440, height: s.h || 900 }, deviceScaleFactor: 1, userAgent: s.movil ? undefined : userAgent, isMobile: !!s.movil });
  if (s.marca) await B.preparar(ctx, s.marca);
  const p = await ctx.newPage();
  await p.goto(s.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(3500); await G.limpiar(p);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate((yy) => { (window.__lenis || window.lenis)?.scrollTo?.(yy, { immediate: true, force: true }); scrollTo(0, yy); }, y); await p.waitForTimeout(250); }
  const hs = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName} ${Math.round(h.getBoundingClientRect().top + scrollY)} ${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80)}`));
  console.log(k, 'alto', H); console.log(hs.join('\n'));
  await p.evaluate(() => { (window.__lenis || window.lenis)?.scrollTo?.(0, { immediate: true, force: true }); scrollTo(0, 0); }); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/${k}.jpg`, fullPage: true, type: 'jpeg', quality: 55 }).catch((e) => console.log('captura', e.message));
  await b.close();
})();
