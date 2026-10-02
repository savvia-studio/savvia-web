// RONDA 89 · los altavoces integrados y la RUEDA: captura de la mesa, giro arrastrando, rueda del ratón, clic = silencio
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45);
  await p.evaluate((y) => scrollTo(0, y), y); await p.mouse.click(10, 400); await p.waitForTimeout(4000);
  await p.screenshot({ path: `tools/shots/r89-mesa-${motor}-${W}.jpg`, quality: 80 });
  const bb = await (await p.$('[data-rueda]')).boundingBox();
  const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  const leer = () => p.evaluate(() => ({ v: document.querySelector('[data-rueda]').getAttribute('aria-valuenow'), g: +window.__sonido().ganancia.toFixed(3) }));
  const r0 = await leer();
  await p.mouse.move(cx, cy); await p.mouse.down(); await p.mouse.move(cx, cy + 60, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(500);
  const r1 = await leer();
  await p.mouse.move(cx, cy); await p.mouse.wheel(0, -300); await p.waitForTimeout(500);
  const r2 = await leer();
  await p.screenshot({ path: `tools/shots/r89-rueda-${motor}-${W}.png`, clip: { x: bb.x - 120, y: bb.y - 160, width: 260, height: 240 } });
  await p.mouse.click(cx, cy); await p.waitForTimeout(900); const r3 = await leer();
  await p.mouse.click(cx, cy); await p.waitForTimeout(1500); const r4 = await leer();
  console.log(JSON.stringify({ motor, W, errs, r0, arrastrarAbajo: r1, rueda: r2, clicSilencia: r3, clicVuelve: r4, scrollY: await p.evaluate(() => scrollY) }));
  await b.close();
})();
