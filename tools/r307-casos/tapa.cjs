const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = process.argv[2] === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:4332/proyectos/neety/'); await p.waitForTimeout(1500);
  const ys = [300, 700, 1300, 2100, 3000, 4200];
  for (const y of ys) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(500); await p.screenshot({ path: `tools/r307-casos/tapa-${y}.png`, clip: { x: 0, y: 0, width: 1440, height: 220 } }); }
  // quién está encima en la franja de arriba (por encima de la barra) en cada punto
  const res = [];
  for (const y of ys) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(200);
    res.push(await p.evaluate(() => [40, 75, 100].map((yy) => { const e = document.elementFromPoint(900, yy); return yy + ':' + (e?.tagName + '.' + String(e?.className?.baseVal ?? e?.className).slice(0, 40)); }))); }
  console.log(JSON.stringify(res, null, 0));
  // modo foco: lo mismo dentro de la ventana
  await p.evaluate(() => scrollTo(0, 1200)); await p.click('[data-foco]'); await p.waitForTimeout(700);
  for (const d of [0, 600, 1500, 2600]) { await p.evaluate((d) => { document.querySelector('[data-foco-zona]').scrollTop += d; }, d); await p.waitForTimeout(400); await p.screenshot({ path: `tools/r307-casos/tapa-foco-${d}.png`, clip: { x: 0, y: 0, width: 1440, height: 220 } }); }
  await b.close();
})();
