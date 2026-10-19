// RONDA 249 · las tarjetas REALES de la rejilla de /proyectos (a 2×) y dónde cae la pantalla de cada una, para el muro del reel
const fs = require('fs');
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto('http://localhost:4332/proyectos?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 300) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); }
  await p.addStyleTag({ content: '.vid-ic{display:none!important} .pieza *{transition:none!important;animation:none!important}' });
  const n = await p.evaluate(() => [...document.querySelectorAll('[data-pieza-obra]:not(.pz-grande)')].length);
  const out = [];
  for (let i = 0; i < n; i++) {
    const el = (await p.$$('[data-pieza-obra]:not(.pz-grande)'))[i];
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
    const info = await el.evaluate((e) => { const r = e.getBoundingClientRect(), L = e.querySelector('.lamina').getBoundingClientRect(), v = e.querySelector('video'), vr = v.getBoundingClientRect();
      return { nombre: e.querySelector('.nombre')?.textContent.trim(), w: r.width, h: r.height, lam: [L.left - r.left, L.top - r.top, L.width, L.height], scr: [vr.left - r.left, vr.top - r.top, vr.width, vr.height], src: v.dataset.src, poster: v.getAttribute('poster'), x: r.left + scrollX, y: r.top + scrollY }; });
    await el.screenshot({ path: `hf/assets/port/p${i}.png` });
    out.push(info);
  }
  fs.writeFileSync('portfolio.json', JSON.stringify(out, null, 1)); console.log(JSON.stringify(out.map((o) => [o.nombre, Math.round(o.x), Math.round(o.y), Math.round(o.w), Math.round(o.h), o.scr.map(Math.round), o.src])));
  await b.close(); })();
