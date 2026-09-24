// Ronda 46 · sentado, el ambiente con «cascos»: node tools/r46-cascos.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const y = await p.evaluate(() => { const s = document.querySelector('#proyectos'); return s.getBoundingClientRect().top + scrollY + (s.querySelector('.pista').offsetHeight - innerHeight) * 0.6; });
  await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(3000);
  await p.click('[data-mas]'); await p.waitForTimeout(700); await p.click('[data-sonido]'); await p.waitForTimeout(2500);
  const R = { de_pie: await p.evaluate(() => window.__sonido()) };
  await p.click('[data-sentarse]'); await p.waitForTimeout(400); R.a_medias = await p.evaluate(() => window.__sonido().cascos); await p.waitForTimeout(2200);
  R.sentado = await p.evaluate(() => window.__sonido());
  await p.keyboard.press('Escape'); await p.waitForTimeout(2600); R.levantado = await p.evaluate(() => window.__sonido().cascos);
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify(R));
  await b.close();
})();
