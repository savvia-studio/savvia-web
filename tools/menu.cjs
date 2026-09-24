// Menú abierto: node tools/menu.cjs <url> <prefijo> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'menu', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(3800);
  await p.click('[data-rejilla]'); await p.waitForTimeout(180);
  await p.screenshot({ path: `tools/shots/${pre}_a.jpg`, type: 'jpeg', quality: 80 });
  await p.waitForTimeout(1100);
  await p.screenshot({ path: `tools/shots/${pre}_b.jpg`, type: 'jpeg', quality: 80 });
  await p.keyboard.press('Escape'); await p.waitForTimeout(700);
  console.log(JSON.stringify(await p.evaluate(() => ({ oculto: document.querySelector('[data-menu]').hidden, foco: document.activeElement.getAttribute('aria-label') }))));
  await b.close();
})();
