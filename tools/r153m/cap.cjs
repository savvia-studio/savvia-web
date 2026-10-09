// RONDA 153 · la capitular de cerca (DPR 2), a mitad de escribir y escrita.
const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const out = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r153m';
(async () => {
  const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W < 700 ? 844 : 720;
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:4322/manifiesto', { waitUntil: 'networkidle' });
  await p.waitForTimeout(6000);
  const y = await p.evaluate(() => document.querySelector('[data-capitular]').getBoundingClientRect().top + scrollY);
  for (let s = 0; s < 8; s++) { await p.mouse.wheel(0, (y - H * 0.45) / 8); await p.waitForTimeout(250); }
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => { const r = document.querySelector('.abre').getBoundingClientRect(); return { x: r.left - 70, y: r.top - 60, width: Math.min(r.width + 90, innerWidth - r.left + 70), height: 320 }; });
  r.x = Math.max(0, r.x); r.width = Math.min(r.width, W - r.x);
  await p.screenshot({ path: `${out}/cap-${motor}-${W}-medio.png`, clip: r });
  await p.waitForTimeout(2600);
  await p.screenshot({ path: `${out}/cap-${motor}-${W}.png`, clip: r });
  await b.close();
})();
