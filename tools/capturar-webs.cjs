// Captura completa de cada web de proyecto a ancho de escritorio (1440) → public/media/proyectos/<slug>.webp (1320 px de ancho).
// Antes de capturar recorre la página entera para disparar las entradas por scroll, y vuelve arriba.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const SOLO = process.argv[2];
const WEBS_TODAS = { multiverse: 'https://multiverse-home.vercel.app/', playground: 'https://playground-iep-two.vercel.app/home-v5.html', neety: 'https://neety.treseiscero.app/home', zernio: 'https://zernio.treseiscero.app/' };
const WEBS = SOLO ? { [SOLO]: WEBS_TODAS[SOLO] } : WEBS_TODAS;
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [slug, url] of Object.entries(WEBS)) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 725 }, deviceScaleFactor: 1, userAgent, reducedMotion: 'reduce' })).newPage();
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch { /* seguimos con lo cargado */ }
    await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(140); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(700);
    const buf = await p.screenshot({ fullPage: true, type: 'png' });
    const meta = await sharp(buf).metadata();
    const alto = Math.min(meta.height, 9000);
    // si la web desborda en horizontal (Neety: 1583 px), la captura sale más ancha: se recorta al ancho de la ventana
    await sharp(buf).extract({ left: 0, top: 0, width: Math.min(meta.width, 1440), height: alto }).resize({ width: 1320 }).webp({ quality: 80 }).toFile(`public/media/proyectos/${slug}.webp`);
    console.log(slug, meta.width, meta.height, '→', alto);
    await p.context().close();
  }
  await b.close();
})();
