// RONDA 85 · los altavoces de la mesa: con Vivaldi sonando, ¿laten (--vib) y sueltan notas?
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45);
  await p.evaluate((y) => scrollTo(0, y), y); await p.mouse.click(10, 400); await p.waitForTimeout(6000);
  const vibs = []; let notas = 0;
  for (let i = 0; i < 20; i++) { await p.waitForTimeout(100); vibs.push(+(await p.evaluate(() => getComputedStyle(document.querySelector('[data-escena]')).getPropertyValue('--vib') || 0))); notas = Math.max(notas, await p.evaluate(() => document.querySelectorAll('.nota-alt').length)); }
  await p.screenshot({ path: `tools/shots/r85-altavoces-${motor}.jpg`, quality: 80 });
  // pulsar un altavoz apaga la música (y otra vez la enciende)
  const bb = await (await p.$('[data-interruptor]')).boundingBox();
  await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(1500);
  const apagado = await p.evaluate(() => ({ son: window.__sonido(), clase: document.querySelector('[data-altavoz-mesa]').className + ' · ' + document.querySelector('[data-interruptor]').getAttribute('aria-pressed') }));
  await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(2500);
  const encendido = await p.evaluate(() => window.__sonido().ganancia);
  console.log(JSON.stringify({ apagadoGanancia: apagado.son.ganancia, clase: apagado.clase, encendido }));
  console.log(JSON.stringify({ motor, errs, vibMax: Math.max(...vibs), vibMin: Math.min(...vibs), notas }));
  await b.close();
})();
