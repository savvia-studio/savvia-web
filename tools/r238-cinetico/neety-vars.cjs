// RONDA 255 · ¿qué variables de color usa neety.com? (para reteñir una sección de verdad, no con un filtro)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const v = await p.evaluate(() => { const cs = getComputedStyle(document.documentElement), out = {}; const rec = (rs) => { for (const r of rs) { if (r.cssRules) rec(r.cssRules); if (r.style) for (const n of r.style) if (n.startsWith('--color') || /naranja|plum|azul|berenj|ciruela|mint|base|grad/i.test(n)) out[n] = cs.getPropertyValue(n).trim() || r.style.getPropertyValue(n).trim(); } }; for (const sh of document.styleSheets) { try { rec(sh.cssRules); } catch {} } return out; });
  console.log(JSON.stringify(v, null, 1)); await b.close(); })();
