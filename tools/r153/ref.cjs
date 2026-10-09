// Ronda 153 · captura la referencia (casabien · Hannun) de arriba abajo, en tramos
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://casabien.com/proyectos/rebranding-identidad-hannun/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(2000);
  for (const t of ['Aceptar', 'Accept', 'Rechazar', 'Aceptar todo']) { const bt = p.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); break; } }
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  console.log('alto', H);
  let i = 0;
  for (let y = 0; y < H; y += 800) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700); await p.screenshot({ path: `tools/r153/shots/ref-${String(i++).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 55 }); }
  const txt = await p.evaluate(() => document.querySelector('main')?.innerText || document.body.innerText);
  require('fs').writeFileSync('tools/r153/shots/ref.txt', txt);
  await b.close();
})();
