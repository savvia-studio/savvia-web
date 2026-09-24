// Ronda 51 · recorrido completo para la crítica: una captura cada ~0,85 pantallas + el texto visible. node tools/r51-recorrido.cjs [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, userAgent })).newPage();
  await p.goto('https://savvia.studio/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight); let y = 0, k = 0;
  while (y < H) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(k === 0 ? 300 : 1700); await p.screenshot({ path: `tools/shots/r51-${w}-${String(k).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 }); y += Math.round(+h * 0.85); k++; }
  const txt = await p.evaluate(() => document.querySelector('main')?.innerText || document.body.innerText);
  require('fs').writeFileSync(`tools/shots/r51-${w}-texto.txt`, txt);
  console.log(w, 'capturas', k, 'alto', H); await b.close();
})();
