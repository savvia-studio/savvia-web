const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} window.__ev = []; addEventListener('savvia:estacion', (e) => window.__ev.push(e.detail)); });
  const p = await ctx.newPage(); p.on('console', (m) => console.log('consola', m.type(), m.text()));
  await p.goto('http://localhost:4322/manifiesto?carga=0&estacion=' + (process.argv[2] || 'primavera'), { waitUntil: 'load' });
  await p.waitForTimeout(4000);
  console.log(await p.evaluate(async () => { const r = {}; for (const e of ['primavera','otono']) { const i = new Image(); i.src = '/media/manifiesto/brote-' + e + '.webp'; await i.decode(); const c = document.createElement('canvas'); c.width = 100; c.height = 31; const x = c.getContext('2d'); x.drawImage(i, 0, 0, 100, 31); const d = x.getImageData(0, 0, 100, 31).data; let s = 0; for (let k = 3; k < d.length; k += 4) s += d[k]; r[e] = [i.naturalWidth, s / (d.length / 4)]; } return r; }));
  console.log(await p.evaluate(() => ({ ev: window.__ev, html: document.documentElement.dataset.estacion, cvs: [...document.querySelectorAll('[data-brote-caja] canvas')].map((c) => [c.width, c.height, c.style.opacity, c.style.mask || c.style.webkitMask]), img: document.querySelector('[data-brote-img]').src })));
  for (const t of [1, 2, 3]) { await p.waitForTimeout(1500); await p.screenshot({ path: __dirname + '/shots/depura-' + t + '.png', clip: { x: 400, y: 540, width: 480, height: 180 } }); }
  await b.close();
})();
