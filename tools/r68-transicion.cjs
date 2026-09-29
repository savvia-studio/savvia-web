// Ronda 68 · la transición líquida entre páginas: sale (mancha con gotitas) y llega (se escurre hacia abajo)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/proyectos'); await p.waitForTimeout(2500);
  const a = await p.$eval('a[href^="/proyectos/"]', (e) => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.4, y: r.top + r.height * 0.4 }; });
  await p.waitForTimeout(500);
  await p.mouse.click(a.x, a.y);
  for (let i = 0; i < 9; i++) { await p.waitForTimeout(100); await p.screenshot({ path: `tools/shots/r68-vt-${motor}-${W}-${i}.jpg`, quality: 60 }).catch(() => {}); }
  await p.waitForTimeout(1500);
  const st = await p.evaluate(() => ({ url: location.pathname, capas: document.querySelectorAll('.vt-savia').length, llega: document.documentElement.classList.contains('vt-llega') }));
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify(st));
  await b.close();
})();
