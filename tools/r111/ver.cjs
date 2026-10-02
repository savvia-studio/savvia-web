const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const base = process.argv[2] || 'http://localhost:4400';
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  const bad = []; p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
  for (const [n, u] of [['oscura', '/musica/?carga=0'], ['clara', '/musica-clara?carga=0']]) {
    await p.goto(base + u); await p.waitForTimeout(5500);
    await p.screenshot({ path: `tools/shots/r111-${n}-hero.jpg`, quality: 70 });
    await p.evaluate(() => scrollTo(0, innerHeight * 2.2)); await p.waitForTimeout(1500);
    await p.screenshot({ path: `tools/shots/r111-${n}-2.jpg`, quality: 70 });
    console.log(n, await p.evaluate(() => ({ paleta: document.documentElement.dataset.paleta || 'oscura', listo: !!document.querySelector('[data-lienzo].listo') })));
  }
  console.log(JSON.stringify(bad.slice(0, 10)));
  await b.close();
})();
