// Ronda 65 · el pie: luz en todas las estaciones que ilumina «Contáctanos», la palabra partida (delante/detrás de las montañas) y el botón al pasar
// node tools/r65-pie.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000);
  await p.mouse.move(W * 0.3, H * 0.5); await p.waitForTimeout(1500);
  await p.screenshot({ path: `tools/shots/r66-pie-${motor}-${W}-a.jpg`, quality: 72 });
  await p.mouse.move(W * 0.7, H * 0.5); await p.waitForTimeout(1500);
  await p.screenshot({ path: `tools/shots/r66-pie-${motor}-${W}-b.jpg`, quality: 72 });
  const bb = await p.$eval('[data-contacta]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.2, y: r.top + r.height * 0.4 }; });
  await p.mouse.move(bb.x, bb.y); await p.waitForTimeout(1200);
  await p.screenshot({ path: `tools/shots/r66-pie-${motor}-${W}-hover.jpg`, quality: 72 });
  await p.waitForTimeout(600);
  const bt = await p.$eval('.cta-bt', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + 12, y: r.top + r.height / 2 }; });
  await p.mouse.move(bt.x, bt.y); await p.waitForTimeout(900);
  await p.screenshot({ path: `tools/shots/r66-pie-${motor}-${W}-cta.jpg`, quality: 72 });
  const st = await p.evaluate(() => { const d = document.querySelector('[data-contacta]'); const c = document.querySelector('[data-cta-pie]'); return { corte: d.style.getPropertyValue('--corte'), abierto: document.querySelector('[data-pie]').classList.contains('cta-abierto'), panel: getComputedStyle(c).translate, mojado: document.querySelector('.cta-bt').classList.contains('mojado'), luz: getComputedStyle(document.querySelector('.luz-pie')).opacity }; });
  const ovf = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(motor, W, errs.length ? errs.slice(0, 4) : 'sin errores', JSON.stringify(st), 'desborde', ovf);
  await b.close();
})();
