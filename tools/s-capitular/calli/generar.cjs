// Genera muchas «S» con Calligrapher.ai (modelo de escritura entrenado con trazos reales) y guarda sus trazos.
// uso: node generar.cjs <salida.json> [repeticiones]
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = process.argv[2], REP = +(process.argv[3] || 3);
const ESTILOS = ['-', '44', '54', '23', '1', '19', '6', '30', '11', '21'];
const SESGOS = ['0.35', '0.6', '0.9', '1.4'];
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1024, height: 768 } });
  await p.goto('https://www.calligrapher.ai/', { waitUntil: 'networkidle' });
  const set = (sel, v) => p.$eval(sel, (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, v);
  await set('#speed-slider', '9.51');
  await p.fill('input[type=text]', 'S');
  const res = [];
  for (const st of ESTILOS) for (const bias of SESGOS) for (let r = 0; r < REP; r++) {
    await p.selectOption('#select-style', st); await set('#bias-slider', bias);
    await p.click('#draw-button');
    let prev = '', est = 0;
    for (let t = 0; t < 60; t++) { await p.waitForTimeout(120); const cur = await p.$$eval('svg path[style]', (ps) => ps.map((x) => x.getAttribute('d')).join('|')); if (cur && cur === prev) { if (++est > 3) break; } else est = 0; prev = cur; }
    const d = await p.$$eval('svg path[style]', (ps) => ps.map((x) => x.getAttribute('d')));
    res.push({ st, bias, r, d });
    process.stdout.write('.');
  }
  fs.writeFileSync(OUT, JSON.stringify(res));
  console.log('\n', res.length, 'únicas', new Set(res.map((x) => x.d.join('|'))).size);
  await b.close();
})();
