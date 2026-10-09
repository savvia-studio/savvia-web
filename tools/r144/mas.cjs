const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  await p.goto('http://localhost:4322/?lenis=0&carga=0', { waitUntil: 'networkidle' });
  for (const [sel, n] of [['.cuadricula', 'cuad'], ['[data-voz]', 'voz']]) {
    await p.evaluate((s) => { const el = document.querySelector(s); scrollTo(0, el.getBoundingClientRect().top + scrollY - 120); }, sel);
    await p.waitForTimeout(2600);
    await p.screenshot({ path: `/tmp/r144-mas-${n}.png` });
  }
  console.log(errs);
  await b.close();
})();
