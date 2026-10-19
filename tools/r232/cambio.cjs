// Ronda 232 · graba el cambio de estación en cada sección (fotogramas tras pulsar el icono de la barra) → hoja por sección
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const URL = process.argv[2] || 'http://localhost:4332/?carga=0';
const ENG = process.argv[3] || 'chrome', W = +(process.argv[4] || 1280), H = W < 600 ? 844 : 720;
const SECS = (process.argv[5] || 'hero,problemas,la-savvia,proyectos,anteriores,servicios,estudio,preguntas,contacto').split(',');
const T = [0, 120, 300, 600, 1000, 1500, 2200, 3200];
(async () => {
  const eng = ENG === 'webkit' ? webkit : chromium;
  const b = await eng.launch(ENG === 'webkit' ? { headless: true } : launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, ...(ENG === 'chrome' ? { userAgent } : {}) });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(URL, { waitUntil: 'load' }); await p.waitForTimeout(4000);
  for (const s of SECS) {
    await p.evaluate((s) => {
      if (s === 'mesa') { document.getElementById('proyectos').scrollIntoView({ block: 'start' }); scrollBy(0, innerHeight * 1.9); return; }
      if (s === 'pmesa') { document.querySelector('.mesa:has(.foto-e)').scrollIntoView({ block: 'center' }); return; }
      if (s === 'barrido') { document.querySelector('.lamina.barrido').scrollIntoView({ block: 'center' }); return; }
      const el = s === 'hero' ? document.querySelector('.hero') : document.getElementById(s); el.scrollIntoView({ block: s === 'contacto' ? 'end' : 'start' }); scrollBy(0, s === 'hero' || s === 'contacto' ? 0 : 40);
    }, s);
    await p.waitForTimeout(s === 'contacto' ? 9000 : 3500);
    const fr = []; const t0 = Date.now();
    await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
    for (const t of T) { const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w); fr.push(await p.screenshot({ type: 'jpeg', quality: 60 })); }
    const sw = Math.round(W / 3), sh = Math.round(H / 3);
    const tiles = await Promise.all(fr.map((f) => sharp(f).resize(sw, sh).toBuffer()));
    await sharp({ create: { width: sw * 4, height: sh * 2, channels: 3, background: '#000' } })
      .composite(tiles.map((t, i) => ({ input: t, left: (i % 4) * sw, top: Math.floor(i / 4) * sh }))).jpeg({ quality: 80 })
      .toFile(`tools/shots/r232-${ENG}-${W}-${s}.jpg`);
    console.log(s, 'ok');
  }
  console.log('errores', errs);
  await b.close();
})();
