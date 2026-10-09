// RONDA 152 · capturas de un bloque del caso (por su título): node tools/r152/ver.cjs <slug> <ancho> "<título>" [sufijo]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [slug, W, tit, suf = ''] = process.argv.slice(2);
const OUT = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/4a330437-fe35-417c-bed0-2d5af9993a14/scratchpad';
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: +W, height: +W > 600 ? 800 : 844 }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4322/${slug.startsWith('/') ? slug.slice(1) : 'proyectos/' + slug}?carga=0`, { waitUntil: 'load' });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(100); }
  const el = tit === 'todo' ? p.locator('main') : p.locator('section', { has: p.locator(`h2:text-is("${tit}")`) }).first();
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(2500);
  await el.screenshot({ path: `${OUT}/ver-${slug.replace(/\W/g, '')}-${W}${suf}.jpg`, type: 'jpeg', quality: 70 });
  await b.close();
})();
