// RONDA 76 · aislar qué mantiene la web a 30 fps a DPR 2 (parada en Servicios, sin scroll): apagar UNA cosa, medir, restaurar
const { chromium } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
  await p.goto('http://localhost:4331/'); await p.waitForTimeout(2000);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h * 0.45; y += 200) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
  const destino = process.argv[2] || 'servicios';
  await p.evaluate((d) => document.getElementById(d).scrollIntoView(), destino); await p.waitForTimeout(1500);
  const medir = () => p.evaluate(() => new Promise((r) => { const f = []; let l = performance.now(); const t = (n) => { f.push(n - l); l = n; if (f.length < 90) requestAnimationFrame(t); else { f.sort((a, b) => a - b); r(`mediana ${f[45].toFixed(1)} · p90 ${f[81].toFixed(1)}`); } }; requestAnimationFrame(t); }));
  console.log('base', await medir());
  const pruebas = JSON.parse(process.env.PRUEBAS || '{}');

  for (const [n, sel] of Object.entries(pruebas)) {
    await p.evaluate((s) => document.querySelectorAll(s).forEach((e) => { e.dataset.oc = e.style.display; e.style.display = 'none'; }), sel);
    await p.waitForTimeout(400);
    const m = await medir();
    await p.evaluate((s) => document.querySelectorAll(s).forEach((e) => { e.style.display = e.dataset.oc || ''; }), sel);
    await p.waitForTimeout(400);
    console.log(n.padEnd(26), m, '| restaurado', await medir());
  }
  await b.close();
})();
