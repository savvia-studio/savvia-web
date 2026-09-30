// RONDA 76 · bajar la home entera y VOLVER a subir: tareas largas y contextos WebGL rehechos durante la subida (Chrome real, CPU ×4)
const { chromium } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const url = process.argv[2] || 'http://localhost:4331/';
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--disable-renderer-backgrounding', '--disable-background-timer-throttling'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => {
    try { localStorage.setItem('savvia:carga', '1'); } catch {}
    window.__lt = []; window.__rest = 0; window.__fase = 'baja';
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([window.__fase, Math.round(e.duration)]))).observe({ entryTypes: ['longtask'] });
    addEventListener('webglcontextrestored', () => window.__rest++, true);
  });
  const p = await ctx.newPage();
  await (await ctx.newCDPSession(p)).send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(3000);
  const h = await p.evaluate(() => document.body.scrollHeight - innerHeight);
  for (let y = 0; y <= h; y += 60) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(30); }
  await p.waitForTimeout(3000);
  await p.evaluate(() => (window.__fase = 'sube'));
  for (let y = h; y >= 0; y -= 60) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(30); }
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => ({ lt: window.__lt, rest: window.__rest }));
  const sube = r.lt.filter((x) => x[0] === 'sube').map((x) => x[1]), baja = r.lt.filter((x) => x[0] === 'baja').map((x) => x[1]);
  const res = (a) => `${a.length} tareas largas · bloqueo ${a.reduce((s, d) => s + Math.max(0, d - 50), 0)} ms · máx ${Math.max(0, ...a)} ms`;
  console.log(url, '\n  bajando:', res(baja), '\n  subiendo:', res(sube), '\n  contextos rehechos (webglcontextrestored):', r.rest);
  await b.close();
})();
