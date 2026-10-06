// RONDA 118 · las notas te siguen con el scroll desde el hero y forman cada línea al llegar
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0&lenis=0'); await p.waitForTimeout(3500);
  const fin = await p.evaluate(() => { const s = document.querySelector('[data-dolores]'); return s.getBoundingClientRect().bottom + scrollY - innerHeight; });
  const pasos = 24, out = [];
  for (let i = 1; i <= pasos; i++) {
    await p.evaluate((y) => window.scrollTo(0, y), (fin * i) / pasos); await p.waitForTimeout(260);
    if (i % 3 === 0) await p.screenshot({ path: `tools/shots/r118s-${motor}-${W}-${String(i).padStart(2, '0')}.jpg`, quality: 60 });
    out.push(await p.evaluate(() => [...document.querySelectorAll('[data-parada]')].map((li) => Math.round(parseFloat(li.style.getPropertyValue('--vis') || '0') * 9)).join('')));
  }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  const vuelta = await p.evaluate(() => [...document.querySelectorAll('[data-parada]')].map((li) => Math.round(parseFloat(li.style.getPropertyValue('--vis') || '0') * 9)).join(''));
  console.log(JSON.stringify({ errs, out: out.join(' '), vuelta, des: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
