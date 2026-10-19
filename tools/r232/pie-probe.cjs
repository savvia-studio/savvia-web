const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  p.on('pageerror', (e) => console.log('ERR', String(e)));
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.getElementById('contacto').scrollIntoView({ block: 'end' }));
  for (let i = 0; i < 6; i++) { await p.waitForTimeout(2000); console.log(i * 2 + 2, await p.evaluate(() => document.querySelector('#contacto .paisaje').className + ' | ' + document.getElementById('contacto').className)); }
  await b.close();
})();
