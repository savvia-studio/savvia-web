// RONDA 90 · el ecualizador de volumen del rótulo: captura, arrastre, rueda, clic = silencio
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, est = process.argv[4] || '';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + (est ? '&estacion=' + est : '')); await p.waitForTimeout(1500);
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45);
  await p.evaluate((y) => scrollTo(0, y), y); await p.mouse.click(10, 400); await p.waitForTimeout(4000);
  const tag = `${motor}-${W}${est ? '-' + est : ''}`;
  await p.screenshot({ path: `tools/shots/r90-volumen-${tag}.jpg`, quality: 80 });
  const bb = await (await p.$('[data-eq] .eq-barras')).boundingBox();
  const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  const leer = () => p.evaluate(() => ({ v: document.querySelector('[data-eq]').getAttribute('aria-valuenow'), g: +window.__sonido().ganancia.toFixed(3) }));
  const r0 = await leer();
  await p.mouse.move(cx, cy); await p.mouse.down(); await p.mouse.move(cx - bb.width * 0.45, cy, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(500);
  const r1 = await leer();
  await p.screenshot({ path: `tools/shots/r90-volumen-ctl-${tag}.png`, clip: { x: Math.max(0, bb.x - 260), y: bb.y - 30, width: 340, height: 64 } });
  await p.mouse.move(cx, cy); await p.mouse.wheel(0, -400); await p.waitForTimeout(500); const r2 = await leer();
  await p.mouse.click(cx, cy); await p.waitForTimeout(900); const r3 = await leer();
  await p.mouse.click(cx, cy); await p.waitForTimeout(1500); const r4 = await leer();
  await p.focus('[data-eq]'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(300); const r5 = await leer();
  const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ motor, W, est, errs, r0, arrastrarIzq: r1, rueda: r2, clicSilencia: r3, clicVuelve: r4, flecha: r5, desborde: desb }));
  await b.close();
})();
