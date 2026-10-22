// Ronda 153 · mide la escala tipográfica REAL de cada web (estilos computados a 1440 px): titular, subtítulo, texto, detalle y botón.
// Guarda una línea JSON por web en tools/r153/escala.json y recorta el bloque «titular + texto + botón» del hero como ejemplo aplicado.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
const webs = [
  ['quantus', 'https://quantus-demo.vercel.app/'],
  ['patchbay', 'https://patchbay-web.vercel.app/'],
  ['kuanta', 'file:///Users/andonimart/Desktop/Claude%20Code/multiverse-home/dist/index.html'],
  ['arkdev', 'https://zernio.treseiscero.app/'],
  ['playground', 'https://playgroundiep.com/'],
  ['neety', 'https://neety.treseiscero.app/home'],
  ['invopop', 'https://invopop.com/'],
  ['business-online-payroll', 'https://businessonlinepayroll.com/'],
  ['cubbo', 'https://cubbo.com/'],
  ['remerge', 'https://remerge.io/'],
  ['isotrol', 'https://isotrol.com/'],
];
const solo = process.argv[2];
(async () => {
  const b = await chromium.launch(launchOpts);
  const out = {};
  for (const [slug, url] of webs) {
    if (solo && solo !== slug) continue;
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'load', timeout: 45000 });
      await p.waitForTimeout(4500);
      // bajar despacio para que las secciones se monten
      for (let y = 0; y < 6000; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(150); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1200);
      const r = await p.evaluate(() => {
        const vis = (e) => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return b.width > 20 && b.height > 8 && s.visibility !== 'hidden' && +s.opacity > 0.1 && s.display !== 'none'; };
        const est = (e, n) => { if (!e) return null; const s = getComputedStyle(e); return { n, txt: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 60), fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), px: parseFloat(s.fontSize), lh: s.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(s.lineHeight) * 10) / 10, peso: s.fontWeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, bg: s.backgroundColor }; };
        const todos = (sel) => [...document.querySelectorAll(sel)].filter(vis);
        const h1 = todos('h1')[0];
        const h2 = todos('h2').find((e) => e.innerText.trim().length > 8);
        const h3 = todos('h3').find((e) => e.innerText.trim().length > 4);
        const pp = todos('p').filter((e) => e.innerText.trim().length > 90 && !e.closest('footer')).sort((a, b) => 0)[0];
        const det = todos('span,div,p,small,li,a').find((e) => e.children.length === 0 && e.innerText && e.innerText.trim().length > 3 && e.innerText.trim().length < 30 && (getComputedStyle(e).textTransform === 'uppercase' || /mono/i.test(getComputedStyle(e).fontFamily)) && parseFloat(getComputedStyle(e).fontSize) <= 15);
        const btn = todos('a,button').find((e) => { const s = getComputedStyle(e); return s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent' && e.innerText.trim().length > 2 && e.innerText.trim().length < 30 && e.getBoundingClientRect().top < innerHeight; });
        return { h1: est(h1, 'h1'), h2: est(h2, 'h2'), h3: est(h3, 'h3'), p: est(pp, 'p'), det: est(det, 'detalle'), btn: btn ? { ...est(btn, 'botón'), radio: getComputedStyle(btn).borderRadius, alto: Math.round(btn.getBoundingClientRect().height) } : null, fuentes: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.weight))] };
      });
      out[slug] = r;
      console.log(slug, JSON.stringify(r));
      // ejemplo aplicado: el bloque del hero que contiene el h1 (su contenedor más cercano con un párrafo o un botón)
      const caja = await p.evaluate(() => {
        let e = [...document.querySelectorAll('h1')].find((h) => h.getBoundingClientRect().width > 20);
        if (!e) return null;
        for (let i = 0; i < 6 && e.parentElement; i++) { e = e.parentElement; if (e.querySelector('a,button') && e.querySelector('p')) break; }
        const b = e.getBoundingClientRect();
        return { x: Math.max(0, b.x - 24), y: Math.max(0, b.y - 24), width: Math.min(innerWidth, b.width + 48), height: Math.min(innerHeight, b.height + 48) };
      });
      if (caja) await p.screenshot({ path: `tools/r153/shots/aplicado-${slug}.png`, clip: caja });
    } catch (e) { console.log(slug, 'ERROR', e.message.slice(0, 120)); }
    await ctx.close();
  }
  const f = 'tools/r153/escala.json';
  const prev = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : {};
  fs.writeFileSync(f, JSON.stringify({ ...prev, ...out }, null, 1));
  await b.close();
})();
