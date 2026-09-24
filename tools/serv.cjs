// Servicios: hover en cada uno → lámina. node tools/serv.cjs <url>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(process.argv[2], { waitUntil: 'load' }); await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('#servicios').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
  const out = [];
  for (const i of [1, 2]) {
    const r = await p.evaluate((k) => { const b = document.querySelector(`[data-servicio="${k}"] .nombre`).getBoundingClientRect(); return [b.left + 120, b.top + b.height / 2]; }, i);
    await p.mouse.move(r[0] - 30, r[1]); await p.mouse.move(r[0], r[1], { steps: 6 }); await p.waitForTimeout(1100);
    out.push(await p.evaluate(() => ({ on: document.querySelector('[data-lamina-cursor]').classList.contains('on'), cual: [...document.querySelectorAll('[data-lam]')].findIndex((l) => l.classList.contains('on')) })));
    await p.screenshot({ path: `tools/shots/r10serv_${i}.jpg`, type: 'jpeg', quality: 80 });
  }
  console.log(JSON.stringify({ errs, out }));
  await b.close();
})();
