// Tarjetas de pasos: una captura por demo, a mitad de su bucle. node tools/pasos.cjs <url> <prefijo>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'pasos'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(600);
  const top = await p.evaluate(() => document.querySelector('[data-fila]').getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => scrollTo(0, y), top - 90); await p.waitForTimeout(400);
  await p.screenshot({ path: `tools/shots/${pre}_entrada.jpg`, type: 'jpeg', quality: 78 });
  await p.mouse.move(640, 300);
  for (let i = 0; i < 4; i++) { if (i) { await p.click('[data-next]'); } await p.waitForTimeout(4300); await p.screenshot({ path: `tools/shots/${pre}_${i}.jpg`, type: 'jpeg', quality: 80, clip: { x: 400, y: 40, width: 480, height: 640 } }); }
  console.log(JSON.stringify({ errs }));
  await b.close();
})();
