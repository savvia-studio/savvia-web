// RONDA 152 · mide el alto de cada bloque del caso y saca una captura de página entera. node tools/r152/medir.cjs <slug> [ancho] [sufijo]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const slug = process.argv[2] || 'neety', W = +(process.argv[3] || 1280), suf = process.argv[4] || 'antes';
const OUT = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/4a330437-fe35-417c-bed0-2d5af9993a14/scratchpad';
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4322/proyectos/${slug}?carga=0`, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const m = document.querySelector('main');
    const out = [...m.children].map((e) => ({ n: (e.getAttribute('aria-label') || e.querySelector('h2')?.textContent || e.className).slice(0, 30), h: Math.round(e.getBoundingClientRect().height) }));
    return { total: Math.round(m.getBoundingClientRect().height), out };
  });
  console.log(slug, W, JSON.stringify(r));
  await p.evaluate(() => scrollTo(0, 0));
  await p.screenshot({ path: `${OUT}/caso-${slug}-${W}-${suf}.jpg`, fullPage: true, type: 'jpeg', quality: 60 });
  await b.close();
})();
