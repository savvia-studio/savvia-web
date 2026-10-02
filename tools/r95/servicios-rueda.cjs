const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, userAgent })).newPage();
for (let k=0;k<6;k++){ try{ await p.goto('http://localhost:4331/?carga=0&lenis=0'); await p.waitForTimeout(1500); if(await p.evaluate(()=>!!document.querySelector('[data-sub]'))) break;}catch{} }
await p.evaluate(() => document.querySelector('[data-sub]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2600);
const r = await p.evaluate(() => { const r = document.querySelector('[data-sub]').getBoundingClientRect(); return { x: 0, y: r.y - 16, width: 390, height: r.height + 64 }; });
for (const t of [3200, 3480, 3560, 3700]) { /* aprox. a media rueda */ }
const l0 = await p.evaluate(() => document.querySelector('[data-selector]').getAttribute('aria-label'));
await p.waitForFunction((t) => document.querySelector('[data-selector]').getAttribute('aria-label') !== t, l0, { timeout: 6000, polling: 'raf' });
for (const ms of [40, 120, 300]) { await p.waitForTimeout(ms === 40 ? 40 : ms - (ms===120?40:120)); await p.screenshot({ path: `tools/shots/r95-servicios-chrome-390-rueda-${ms}ms.png`, clip: r }); }
await p.screenshot({ path: `tools/shots/r95-servicios-chrome-390-rueda-fin.png`, clip: r });
await b.close(); })();
