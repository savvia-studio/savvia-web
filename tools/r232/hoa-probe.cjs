const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const WK = process.argv[2] === 'webkit'; const b = WK ? await webkit.launch({ headless: true }) : await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, ...(WK ? {} : { userAgent }) })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('[data-slug=home-of-ambrose] .mesa').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  const R = await p.evaluate(() => { const r = document.querySelector('[data-slug=home-of-ambrose] .lamina').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  for (const t of [100, 500, 1000, 1600]) { await p.waitForTimeout(t === 100 ? 100 : t === 500 ? 400 : t === 1000 ? 500 : 600); await p.screenshot({ path: `tools/shots/r232-hoa-${WK ? 'wk' : 'cr'}-${t}.jpg`, type: 'jpeg', quality: 50, clip: R }); }
  await b.close();
})();
