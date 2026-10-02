const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground|neety/i.test(m.text()) && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=1&paleta=clara'); await p.waitForTimeout(1200);
  await p.screenshot({ path: `tools/shots/r91-clara-${motor}-${W}-carga.jpg`, quality: 60 });
  await p.goto('http://localhost:4331/?carga=0&paleta=clara'); await p.waitForTimeout(7000);
  await p.screenshot({ path: `tools/shots/r91-clara-${motor}-${W}-hero.jpg`, quality: 65 });
  for (const sel of ['[data-manifiesto]', '#proyectos', '#anteriores', '#servicios', '#la-savvia', '#estudio', '#preguntas', '[data-pie]']) {
    await p.evaluate((s) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY + (s === '#proyectos' ? e.offsetHeight * 0.4 : 40)); }, sel); await p.waitForTimeout(1300);
    await p.screenshot({ path: `tools/shots/r91-clara-${motor}-${W}-${sel.replace(/[^a-z]/g, '')}.jpg`, quality: 55 });
  }
  console.log(JSON.stringify({ motor, W, errs, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
