// RONDA 97 · el jazz suena tras un gesto, los pulsos llegan y el ASCII late
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0');
  await p.evaluate(() => { window.__pulsos = 0; addEventListener('savvia:pulso', () => window.__pulsos++); });
  await p.mouse.click(640, 300); await p.waitForTimeout(5000);
  const r = await p.evaluate(() => ({ jazz: window.__jazz(), pulsos: window.__pulsos, lienzo: document.querySelector('[data-lienzo]').classList.contains('listo') }));
  await p.screenshot({ path: `tools/shots/r97-hero-${motor}.jpg`, quality: 72 });
  console.log(JSON.stringify({ motor, errs, ...r }));
  await b.close();
})();
