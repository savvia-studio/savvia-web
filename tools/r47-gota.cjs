// Ronda 47 · la gota en la cámara del testimonio: node tools/r47-gota.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  await p.evaluate(() => scrollTo(0, document.querySelector('[data-voces]').getBoundingClientRect().top + scrollY - 80)); await p.waitForTimeout(1200);
  await p.click('[data-voz="1"]'); await p.mouse.move(5, 5); await p.waitForTimeout(900);
  const bb = await (await p.$('[data-voz-video]')).boundingBox(); const clip = { x: bb.x - 24, y: bb.y - 16, width: bb.width + 48, height: bb.height + 32 };
  await p.screenshot({ path: `tools/shots/r47-${motor}-gota-0.png`, clip });
  await p.mouse.move(bb.x + 4, bb.y + 6); await p.waitForTimeout(130); await p.screenshot({ path: `tools/shots/r47-${motor}-gota-1.png`, clip });
  await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r47-${motor}-gota-2.png`, clip });
  const R = await p.evaluate(() => { const c = document.querySelector('[data-voz-video]'); return { mojado: c.classList.contains('mojado'), gx: c.style.getPropertyValue('--gx'), color: getComputedStyle(c).color, fill: getComputedStyle(c.querySelector('svg')).fill, gota: getComputedStyle(c.querySelector('.gota')).transform }; });
  await p.mouse.move(5, 5); await p.waitForTimeout(800); R.fuera = await p.evaluate(() => getComputedStyle(document.querySelector('[data-voz-video] .gota')).transform);
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify(R)); await b.close();
})();
