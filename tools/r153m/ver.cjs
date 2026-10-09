// RONDA 153 · el Manifiesto como savia: capturas a lo largo del scroll y la sonda.
const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const out = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r153m';
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W < 700 ? 844 : 720;
  const est = process.argv[4] || '';
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4322/manifiesto${est ? '?estacion=' + est : ''}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(6500);
  const tag = `${motor}-${W}${est ? '-' + est : ''}`;
  await p.screenshot({ path: `${out}/${tag}-0.jpg`, quality: 70 });
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 1;
  for (let y = 0; y < total; y += H * 0.33) {
    await p.mouse.wheel(0, H * 0.33); await p.waitForTimeout(+(process.env.PAUSA || 1300));
    if (!process.env.SOLO || process.env.SOLO.split(",").includes(String(i))) await p.screenshot({ path: `${out}/${tag}-${String(i).padStart(2, '0')}.jpg`, quality: 70 });
    i++;
    if (i > 40) break;
  }
  await p.waitForTimeout(2500);
  console.log(tag, JSON.stringify(await p.evaluate(() => window.__manifiesto())), 'errores', errs);
  await b.close();
})();
