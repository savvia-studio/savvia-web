const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  // el corte del director al bajar: capturas a 40 % y 80 % del hero
  for (const k of [0.35, 0.7]) { await p.evaluate((k) => scrollTo(0, innerHeight * k), k); await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r89-baja-${motor}-${k}.jpg`, quality: 65 }); }
  const top = await p.evaluate(() => document.querySelector('[data-manifiesto] .parrafo:nth-child(2)').getBoundingClientRect().top + scrollY - 200);
  await p.evaluate((y) => scrollTo(0, y), top); await p.waitForTimeout(800);
  const r = await p.evaluate(() => { const e = document.querySelector('[data-manifiesto] .parrafo:nth-child(2)').getBoundingClientRect(); return [e.left, e.top]; });
  await p.mouse.move(r[0] + 5, r[1] + 20); await p.mouse.down(); await p.mouse.move(r[0] + 520, r[1] + 70, { steps: 20 }); await p.mouse.up();
  await p.waitForTimeout(350);
  await p.screenshot({ path: `tools/shots/r89-seleccion-${motor}.jpg`, quality: 70 });
  console.log(JSON.stringify({ motor, errs, sel: await p.evaluate(() => getSelection().toString().length), notas: await p.evaluate(() => document.querySelectorAll('.notas-seleccion i').length) }));
  await b.close();
})();
