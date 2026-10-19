// Ronda 242 · el DIAGRAMA de savvia agentic (LaPartitura, escritorio) capturado a 3× y sus 20 líneas muestreadas en coordenadas de la escena (1200×675)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
const T = +(process.argv[2] || 0.05);
(async () => { const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 3, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/?carga=0&grabando=1', { waitUntil: 'load' });
  await p.addStyleTag({ content: '[data-nav],.cf,.cf-btn,.cf-panel,[class*="toolbarContainer"]{display:none!important} .cine{-webkit-mask-image:none!important;mask-image:none!important}' });
  const cine = p.locator('[data-partitura] [data-cine]').first(); await cine.scrollIntoViewIfNeeded(); await p.waitForTimeout(3000);
  await p.evaluate((t) => window.__partitura.ir(t), T); await p.waitForTimeout(400);
  const geo = await p.evaluate(() => {
    const c = document.querySelector('[data-partitura] [data-cine]'), r = c.getBoundingClientRect();
    const vistos = new Set(), lineas = [];
    [...c.querySelectorAll('svg path')].forEach((pa) => { const d = pa.getAttribute('d'); if (!d || vistos.has(d) || !pa.getTotalLength) return; vistos.add(d);
      const L = pa.getTotalLength(), m = pa.getScreenCTM(), pts = [];
      for (let k = 0; k <= 40; k++) { const q = pa.getPointAtLength((L * k) / 40); pts.push([+(m.a * q.x + m.c * q.y + m.e - r.left).toFixed(1), +(m.b * q.x + m.d * q.y + m.f - r.top).toFixed(1)]); }
      lineas.push(pts); });
    const etiquetas = [...c.querySelectorAll('*')].filter((e) => e.children.length === 0 && e.textContent.trim().length > 2 && e.textContent.trim().length < 34).map((e) => { const bb = e.getBoundingClientRect(); return [e.textContent.trim(), +(bb.left - r.left).toFixed(1), +(bb.top - r.top).toFixed(1), +bb.width.toFixed(1), +bb.height.toFixed(1)]; }).filter((x) => x[3] > 0 && x[1] >= 0 && x[1] < 1200);
    const lib = [...c.querySelectorAll('*')].find((e) => e.children.length === 0 && /La librería de Neety/.test(e.textContent))?.closest('div[class]');
    let caja = null; if (lib) { let el = lib; for (let k = 0; k < 4 && el; k++) { const bb = el.getBoundingClientRect(); if (bb.width > 150) { caja = [bb.left - r.left, bb.top - r.top, bb.width, bb.height].map((v) => +v.toFixed(1)); break; } el = el.parentElement; } }
    return { lineas, etiquetas, caja };
  });
  fs.writeFileSync('/Users/andonimart/Desktop/savvia/savvia-web-main/tools/r238-cinetico/diagrama.json', JSON.stringify(geo));
  await cine.screenshot({ path: '/Users/andonimart/Desktop/savvia/savvia-web-main/tools/r238-cinetico/hf/assets/diagrama.jpg', type: 'jpeg', quality: 90 });
  console.log('líneas', geo.lineas.length, 'caja', geo.caja, 'etiquetas', geo.etiquetas.length); console.log(JSON.stringify(geo.etiquetas.slice(0, 30)));
  await b.close(); })();
