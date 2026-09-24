// Evalúa una expresión en la página: node tools/probe.cjs <url> "<js>" [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, js, w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, userAgent })).newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(800);
  console.log(JSON.stringify(await p.evaluate(js), null, 1));
  await b.close();
})();
