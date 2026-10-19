// Ronda 236 · reproduce cada reel (sin descargarlo: en la página) y saca: hoja de fotogramas + cortes medidos a 3 fps (diferencia entre capturas)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const REELS = JSON.parse(process.argv[2]);
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [nombre, url] of REELS) {
    const p = await (await b.newContext({ viewport: { width: 960, height: 540 }, userAgent })).newPage();
    try {
      await p.setContent(`<body style="margin:0;background:#000"><video id="v" src="${url}" muted playsinline preload="auto" style="width:960px;height:540px;object-fit:contain"></video></body>`);
      const dur = await p.evaluate(() => new Promise((ok) => { const v = document.getElementById('v'); v.onloadedmetadata = () => ok(v.duration); v.onerror = () => ok(-1); setTimeout(() => ok(v.duration || -2), 20000); }));
      if (!(dur > 0)) { console.log(nombre, 'sin duración', dur); continue; }
      const fps = 3, N = Math.min(Math.floor(dur * fps), 420), grises = [], hoja = [];
      const paso = dur / Math.max(1, N);
      for (let i = 0; i < N; i++) {
        await p.evaluate((t) => new Promise((ok) => { const v = document.getElementById('v'); v.onseeked = () => ok(); v.currentTime = t; setTimeout(ok, 3000); }), i * paso);
        const img = await p.screenshot({ type: 'jpeg', quality: 70 });
        grises.push(await sharp(img).resize(48, 27).greyscale().raw().toBuffer());
        if (i % Math.ceil(N / 24) === 0) hoja.push(await sharp(img).resize(320, 180).toBuffer());
      }
      const d = grises.slice(1).map((g, i) => { let s = 0; for (let k = 0; k < g.length; k++) s += Math.abs(g[k] - grises[i][k]); return s / g.length; });
      const cortes = d.map((x, i) => [x, i]).filter(([x]) => x > 28).map(([, i]) => +(((i + 1) * paso)).toFixed(1));
      const planos = cortes.length + 1;
      await sharp({ create: { width: 320 * 6, height: 180 * Math.ceil(hoja.length / 6), channels: 3, background: '#000' } }).composite(hoja.map((x, i) => ({ input: x, left: (i % 6) * 320, top: Math.floor(i / 6) * 180 }))).jpeg({ quality: 78 }).toFile(`/Users/andonimart/Desktop/savvia/savvia-web-main/tools/ref236/${nombre}.jpg`);
      console.log(nombre, 'dur', dur.toFixed(1), 's · planos≈', planos, '· plano medio≈', (dur / planos).toFixed(2), 's · cortes', JSON.stringify(cortes.slice(0, 40)));
    } catch (e) { console.log(nombre, 'ERROR', String(e).slice(0, 120)); }
    await p.context().close();
  }
  await b.close();
})();
