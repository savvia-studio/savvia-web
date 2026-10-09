const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  await p.goto('http://localhost:4322/?lenis=0&carga=0', { waitUntil: 'networkidle' });
  await p.evaluate(() => { const el = document.querySelector('[data-paseo]'); scrollTo(0, el.getBoundingClientRect().top + scrollY - 260); });
  await p.waitForTimeout(250); await p.screenshot({ path: '/tmp/r144-es-0.png' });
  await p.waitForTimeout(1200); await p.screenshot({ path: '/tmp/r144-es-1.png' });
  const r = await p.evaluate(() => { const j = document.querySelector('[data-juntos]').getBoundingClientRect(); return [j.left + j.width * 0.38, j.top + j.height * 0.5]; });
  await p.mouse.move(r[0], r[1]); await p.waitForTimeout(650); await p.screenshot({ path: '/tmp/r144-es-2.png' });
  await p.waitForTimeout(300); await p.screenshot({ path: '/tmp/r144-es-3.png' });
  console.log(errs, await p.evaluate(() => document.querySelector('[data-estudio], .estudio')?.className));
  await b.close();
})();
