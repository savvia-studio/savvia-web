const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://www.shopify.com/es-es/editions/winter2026', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(5000);
  const top = await p.evaluate(() => document.getElementById('agentic').getBoundingClientRect().top + scrollY);
  // bajar despacio por la frontera: para ver la transición
  for (let i = 0; i < 12; i++) { await p.evaluate((y) => scrollTo(0, y), top - 900 + i * 110); await p.waitForTimeout(500); await p.screenshot({ path: `tools/ref15/borde-${String(i).padStart(2,'0')}.jpg`, type: 'jpeg', quality: 70 }); }
  // qué hay entre secciones
  console.log(await p.evaluate(() => { const a = document.getElementById('agentic'); const prev = a.previousElementSibling; return [prev?.outerHTML.slice(0, 600), [...a.querySelectorAll('canvas,svg,video')].slice(0,5).map(e=>e.tagName+' '+e.getAttribute('class'))]; }));
  await b.close();
})();
