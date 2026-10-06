// RONDA 117 · «al hacer scroll hay momentos que se para»: perfil de CPU (CDP) bajando la home entera con CPU ×4; tareas largas y funciones con más tiempo propio
const { chromium } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--disable-renderer-backgrounding', '--disable-background-timer-throttling'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([Math.round(scrollY), Math.round(e.duration)]))).observe({ entryTypes: ['longtask'] }); });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.goto(process.argv[2] || 'http://localhost:4321/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => { window.__fr = []; let u = performance.now(); const f = (t) => { window.__fr.push(t - u); if (t - u > 50) (window.__lentos ||= []).push([Math.round(scrollY), Math.round(t - u)]); u = t; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); await cdp.send('Profiler.start');
  const h = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight); console.log('alto', h, await p.evaluate(() => document.documentElement.className));
  for (let y = 0; y <= h; y += 60) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(30); }
  await p.waitForTimeout(1500);
  const { profile } = await cdp.send('Profiler.stop');
  const self = new Map(), dt = profile.timeDeltas, byId = new Map(profile.nodes.map((n) => [n.id, n]));
  profile.samples.forEach((id, i) => { const n = byId.get(id), k = `${n.callFrame.functionName || '(anon)'} @ ${(n.callFrame.url || '').split('/').pop()}:${n.callFrame.lineNumber}`; self.set(k, (self.get(k) || 0) + (dt[i] || 0) / 1000); });
  const padre = new Map(); profile.nodes.forEach((n) => (n.children || []).forEach((c) => padre.set(c, n.id)));
  const quien = new Map(); profile.samples.forEach((id, i) => { const n = byId.get(id); if (!/getBoundingClientRect|elementsFromPoint|getComputedStyle|texImage2D|getImageData|compileShader|linkProgram|getContext|putImageData/.test(n.callFrame.functionName)) return; const pp = byId.get(padre.get(id)); const k = `${n.callFrame.functionName} ← ${pp?.callFrame.functionName || '?'} @ ${(pp?.callFrame.url || '').split('/').pop().split('?')[0]}:${pp?.callFrame.lineNumber}`; quien.set(k, (quien.get(k) || 0) + (dt[i] || 0) / 1000); });
  console.log([...quien].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${v.toFixed(0)}ms  ${k}`).join('\n'));
  const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${v.toFixed(0)}ms  ${k}`);
  const lt = await p.evaluate(() => window.__lt);
  const fr = await p.evaluate(() => window.__fr); const s2 = [...fr].sort((a, b) => a - b);
  console.log('lentos en', JSON.stringify(await p.evaluate(() => window.__lentos || []))); console.log('fotogramas', fr.length, 'p50', s2[Math.floor(s2.length * 0.5)].toFixed(1), 'p95', s2[Math.floor(s2.length * 0.95)].toFixed(1), '>50ms', fr.filter((x) => x > 50).length, '>100ms', fr.filter((x) => x > 100).length, 'max', Math.max(...fr).toFixed(0));
  console.log('tareas largas:', lt.length, 'suma', lt.reduce((s, x) => s + x[1], 0), 'max', Math.max(0, ...lt.map((x) => x[1])));
  console.log(JSON.stringify(lt.filter((x) => x[1] > 120)));
  console.log(top.join('\n'));
  await b.close();
})();
