// RONDA 94 · el hero real de Neety, denso: una captura cada 250 ms del ciclo de la tarjeta + su HTML y animaciones.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'commit' });
  const t0 = Date.now();
  fs.mkdirSync('tools/shots/r94-real/d', { recursive: true });
  const info = [];
  for (let t = 2000; t <= 26000; t += 250) {
    const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w);
    await p.screenshot({ path: `tools/shots/r94-real/d/c${String(t).padStart(5,'0')}.jpg`, quality: 75, clip: { x: 700, y: 120, width: 740, height: 680 } });
    if (t % 1000 === 0) info.push([t, await p.evaluate(() => document.getAnimations().map(a => (a.effect?.target?.className?.baseVal ?? a.effect?.target?.className ?? '').toString().slice(0,60) + ' ' + (a.animationName || '') + ' ' + a.playState).slice(0, 30))]);
  }
  const h = await p.evaluate(() => { const h1 = [...document.querySelectorAll('h1')].find(e => /Detecta/.test(e.textContent)); let s = h1; for (let i = 0; i < 6 && s.parentElement; i++) s = s.parentElement; return s.outerHTML; });
  fs.writeFileSync('tools/shots/r94-real/hero-sec.html', h);
  fs.writeFileSync('tools/shots/r94-real/anims.json', JSON.stringify(info, null, 1));
  await b.close();
})();
