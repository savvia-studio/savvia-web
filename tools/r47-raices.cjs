// Ronda 47 · las raíces hierven como la copa: node tools/r47-raices.cjs [motor] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4331/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(url, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(6000);
  await p.evaluate(() => scrollTo(0, document.querySelector('[data-raices]').getBoundingClientRect().top + scrollY - 200)); await p.waitForTimeout(1500);
  const bb = await (await p.$('[data-raices] [data-lienzo]')).boundingBox(), clip = { x: bb.x, y: Math.max(0, bb.y), width: bb.width, height: Math.min(bb.height, 720 - Math.max(0, bb.y)) };
  const a = await p.screenshot({ clip }); await p.waitForTimeout(250); const c = await p.screenshot({ clip });
  await p.screenshot({ path: `tools/shots/r47-${motor}-raices.png`, clip });
  const diff = await p.evaluate(async ([x, y]) => {
    const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
    const [A, B] = await Promise.all([load(x), load(y)]); const cv = new OffscreenCanvas(A.width, A.height), g = cv.getContext('2d');
    g.drawImage(A, 0, 0); const da = g.getImageData(0, 0, A.width, A.height).data; g.clearRect(0, 0, A.width, A.height); g.drawImage(B, 0, 0); const db = g.getImageData(0, 0, A.width, A.height).data;
    let n = 0; for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 6) n++;
    return +(100 * n / (da.length / 4)).toFixed(2);
  }, [a.toString('base64'), c.toString('base64')]);
  // coste: frames por segundo del documento con hero y raíces a la vista
  const fps = await p.evaluate(() => new Promise((r) => { let n = 0; const t0 = performance.now(); const f = (t) => { n++; t - t0 < 2000 ? requestAnimationFrame(f) : r(Math.round(n / 2)); }; requestAnimationFrame(f); }));
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify({ pixelesQueCambian: diff + ' %', fps }));
  await b.close();
})();
