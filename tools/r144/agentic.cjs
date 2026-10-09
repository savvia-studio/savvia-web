const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  await p.goto('http://localhost:4322/?lenis=0&carga=0', { waitUntil: 'networkidle' });
  const y = await p.evaluate(() => { const s = [...document.querySelectorAll('section')].find((x) => /savvia agentic/i.test(x.textContent || '') && x.querySelector('.neety')); return s ? s.getBoundingClientRect().top + scrollY : 0; });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let k = 0; k < 9; k++) { await p.evaluate((v) => scrollTo(0, v), y + k * 500); await p.waitForTimeout(1300); await p.screenshot({ path: `/tmp/r144-ag-${k}.png` }); }
  console.log(y, H, errs);
  await b.close();
})();
