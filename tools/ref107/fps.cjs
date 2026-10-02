const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
  await p.goto('https://ascii.fm/stations', { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.waitForTimeout(3000);
  // cuántas veces cambia el lienzo por segundo, y cuánto
  const r = await p.evaluate(async () => {
    const c = document.querySelector('canvas'); const o = document.createElement('canvas'); o.width = c.width / 4; o.height = c.height / 4; const x = o.getContext('2d', { willReadFrequently: true });
    let prev = null, cambios = [], t0 = performance.now();
    await new Promise((res) => { const f = () => { x.drawImage(c, 0, 0, o.width, o.height); const d = x.getImageData(0, 0, o.width, o.height).data; if (prev) { let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - prev[i]) > 20) n++; cambios.push([Math.round(performance.now() - t0), n]); } prev = d.slice(); if (performance.now() - t0 < 3000) requestAnimationFrame(f); else res(); }; f(); });
    return cambios;
  });
  const con = r.filter((c) => c[1] > 0);
  console.log('frames', r.length, 'con cambio', con.length, 'intervalos', con.slice(1, 30).map((c, i) => c[0] - con[i][0]).join(','), 'px', con.slice(0, 15).map((c) => c[1]).join(','));
  const sfx = await p.evaluate(async () => { try { const j = await (await fetch('/refs/index.json')).json(); return JSON.stringify(j).slice(0, 1500); } catch (e) { return String(e); } });
  console.log(sfx);
  await b.close();
})();
