// RONDA 76 · Eric: «la web se ralentiza; la primera vez el scroll iba a trompicones». Medición (web-perf-forensics): Chrome real headless, scroll lento de
// 12 px por paso por TODA la home, histograma de frames por sección (% > 20 ms, p90) y tareas largas (bloqueo total, tarea máxima). Primera visita (sin
// caché) y sin la animación de carga. Uso: node tools/r76-perf.cjs [url] [movil] [etiqueta]
const { chromium } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const url = process.argv[2] || 'http://localhost:4331/';
const movil = process.argv[3] === 'movil';
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--window-size=1280,720', '--autoplay-policy=no-user-gesture-required', '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows'] });
  const ctx = await b.newContext(movil ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 720 }, deviceScaleFactor: Number(process.env.DPR || 1) });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const cpu = Number(process.env.CPU || (movil ? 4 : 1));
  if (cpu > 1) { const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu }); }
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  await p.evaluate(() => {
    const w = window;
    // ¿quién crea lienzos WebGL durante el scroll? (cada contexto nuevo = compilar + subir textura)
    w.__gl = [];
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (t, o) { const t0 = performance.now(); const r = orig.call(this, t, o); if (/webgl/.test(t) && !this.__v) { this.__v = 1; w.__gl.push([scrollY, (this.closest('section')||{}).id, (performance.now()-t0).toFixed(1)]); } return r; };
    w.__ft = []; w.__lt = [];
    let last = performance.now();
    (function tick(t) { w.__ft.push([t - last, scrollY]); last = t; requestAnimationFrame(tick); })(performance.now());
    new PerformanceObserver((l) => l.getEntries().forEach((e) => w.__lt.push([e.duration, scrollY]))).observe({ entryTypes: ['longtask'] });
  });
  const secs = await p.evaluate(() => [...document.querySelectorAll('main > section, body > section, section[id], footer')].filter((s) => s.parentElement?.closest('section') == null).map((s) => ({ id: s.id || s.className.split(' ')[0] || s.tagName, top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight })));
  const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const paso = movil ? 16 : 12;
  for (let y = 0; y <= total; y += paso) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(16); }
  await p.waitForTimeout(500);
  const { ft, lt, gl } = await p.evaluate(() => ({ ft: window.__ft, lt: window.__lt, gl: window.__gl }));
  console.log('contextos WebGL creados durante el scroll:', gl.length, JSON.stringify(gl));
  console.log('tareas largas:', JSON.stringify(lt.map((x) => [Math.round(x[0]), Math.round(x[1])])));
  const rep = (arr) => { const d = arr.map((x) => x[0]).sort((a, b) => a - b); if (!d.length) return '—'; const p90 = d[Math.floor(d.length * 0.9)]; const lar = d.filter((x) => x > 20).length / d.length; return `${d.length} frames · >20ms ${(lar * 100).toFixed(1)} % · p90 ${p90.toFixed(1)} ms · máx ${d[d.length - 1].toFixed(0)} ms`; };
  const vh = movil ? 844 : 720;
  console.log(`TOTAL ${rep(ft)} | bloqueo ${lt.reduce((s, x) => s + Math.max(0, x[0] - 50), 0).toFixed(0)} ms, tarea máx ${Math.max(0, ...lt.map((x) => x[0])).toFixed(0)} ms`);
  for (const s of secs) {
    const en = (y) => y + vh / 2 >= s.top && y + vh / 2 < s.top + s.h;
    const lts = lt.filter((x) => en(x[1]));
    console.log(`${(s.id + '            ').slice(0, 14)} ${rep(ft.filter((x) => en(x[1])))} | largas ${lts.length} (máx ${Math.max(0, ...lts.map((x) => x[0])).toFixed(0)})`);
  }
  await b.close();
})();
