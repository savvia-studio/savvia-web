// RONDA 154 · la ventana de una web real en varias alturas, en una hoja (para encuadrar). node tools/r154/vistazo.cjs <slug> y1,y2,… [ancho] [salida.jpg]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const G = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/reel/grabar-comun.cjs');
const W = require('../r152/webs.cjs'); const { execSync } = require('child_process');
(async () => {
  const [k, yl, an = '1920', out = '/tmp/vistazo.jpg'] = process.argv.slice(2), ys = yl.split(',').map(Number), w = +an, h = Math.round(w * 0.5625), s = W[k];
  const b = await chromium.launch({ ...launchOpts, args: ['--hide-scrollbars', '--window-size=1920,1200'] });
  const ctx = await b.newContext({ viewport: { width: w, height: h }, userAgent }); if (s.marca) await B.preparar(ctx, s.marca);
  const p = await ctx.newPage(); await p.goto(s.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(3500); await G.limpiar(p);
  const fs = []; for (const [i, y] of ys.entries()) { await p.evaluate((y) => { const L = window.__lenis || window.lenis; if (L?.scrollTo) L.scrollTo(y, { immediate: true, force: true }); scrollTo(0, y); }, y); await p.waitForTimeout(1300); const f = `/tmp/vz${i}.jpg`; await p.screenshot({ path: f, type: 'jpeg', quality: 70 }); fs.push(f); }
  await b.close();
  execSync(`ffmpeg -loglevel error -y ${fs.map((f) => `-i ${f}`).join(' ')} -filter_complex "${fs.map((_, i) => `[${i}]scale=600:-2[v${i}]`).join(';')};${fs.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${fs.length}:layout=${fs.map((_, i) => `${(i % 3) * 600}_${Math.floor(i / 3) * 338}`).join('|')}:fill=white" ${out}`);
  console.log(out, ys.join(' '));
})();
