const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  await p.evaluate(() => scrollTo(0, document.querySelector('[data-voces]').getBoundingClientRect().top + scrollY - 80)); await p.waitForTimeout(1200);
  const abrirEn = async (seg) => { await p.click('[data-voz-video]'); await p.waitForTimeout(1500); if (seg != null) await p.evaluate((s) => { document.querySelector('[data-rep-video]').currentTime = s; }, seg); await p.waitForTimeout(300); const t = await p.evaluate(() => +window.__reproductor().t.toFixed(1)); await p.keyboard.press('Escape'); await p.waitForTimeout(1300); return t; };
  await p.click('[data-voz="1"]'); await p.waitForTimeout(800); const a = await abrirEn(20);   // Invopop → 20 s
  await p.click('[data-voz="1"]'); await p.waitForTimeout(800); const c = await abrirEn(10);   // Codely → 10 s
  await p.click('[data-voz="-1"]'); await p.waitForTimeout(800); const a2 = await abrirEn(null); // vuelta a Invopop
  await p.click('[data-voz="1"]'); await p.waitForTimeout(800); const c2 = await abrirEn(null); // vuelta a Codely
  console.log({ invopop: a, codely: c, invopopVuelve: a2, codelyVuelve: c2 }); await b.close();
})();
