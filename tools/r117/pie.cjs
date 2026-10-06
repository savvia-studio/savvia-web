// RONDA 117 · el pie en el lenguaje del hero: saxofonista pintado, terraza que desvelan los pulsos, IA, «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 1500 ? 900 : W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/?carga=0';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e.stack || e).slice(0, 300)));
  await p.goto(URL); await p.waitForTimeout(800); await p.mouse.click(5, H - 5);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); 
  const tag = `${motor}-${W}${URL.includes('clara') ? '-clara' : ''}`;
  for (const [i, ms] of [[1, 1200], [2, 3500], [3, 7000], [4, 11000]]) { await p.waitForTimeout(i === 1 ? ms : ms - [0, 1200, 3500, 7000][i - 1]); await p.screenshot({ path: `tools/shots/r117-pie-${tag}-${i}.jpg`, quality: 72 }); }
  const box = await p.evaluate(() => { const c = document.querySelector('[data-contacta]').getBoundingClientRect(); return { x: c.left + c.width * 0.5, y: c.top + c.height * 0.5 }; });
  await p.mouse.move(box.x, box.y); await p.waitForTimeout(1300); await p.screenshot({ path: `tools/shots/r117-pie-${tag}-5.jpg`, quality: 72 });
  console.log(JSON.stringify({ tag, errs, des: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
