// RONDA 64 · la MARCA de cada web medida en vivo: familias tipográficas en uso (titular, texto) y de dónde se sirven, y los colores más usados
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const W = { multiverse: 'https://multiverse-home.vercel.app/', amarra: 'https://zernio.treseiscero.app/', playground: 'https://playground-iep-two.vercel.app/home-v5.html', neety: 'https://neety.treseiscero.app/home', invopop: 'https://invopop.com', 'business-online-payroll': 'https://businessonlinepayroll.com', cubbo: 'https://cubbo.com', remerge: 'https://remerge.io', isotrol: 'https://isotrol.com' };
(async () => {
  const b = await chromium.launch(launchOpts); const out = {};
  for (const [slug, url] of Object.entries(W)) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
    const fuentes = new Set(); p.on('response', (r) => { if (/\.(woff2?|ttf|otf)(\?|$)/.test(r.url())) fuentes.add(r.url().slice(0, 140)); });
    try {
      await p.goto(url, { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(4000);
      for (let y = 0; y < 6000; y += 900) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(250); }
      out[slug] = await p.evaluate(() => {
        const fam = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim() + ' ' + getComputedStyle(e).fontWeight : null; };
        const cuenta = {}, fams = {};
        document.querySelectorAll('body *').forEach((e) => { const r = e.getBoundingClientRect(); if (!r.width || !r.height) return; const cs = getComputedStyle(e); const a = r.width * r.height;
          for (const c of [cs.backgroundColor, cs.color]) if (c && !/rgba\(0, 0, 0, 0\)/.test(c)) cuenta[c] = (cuenta[c] || 0) + (c === cs.color ? 2000 : a);
          if (e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(); fams[f] = (fams[f] || 0) + 1; } });
        return { h1: fam('h1'), h2: fam('h2'), p: fam('p'), familias: Object.entries(fams).sort((a, b) => b[1] - a[1]).slice(0, 5), colores: Object.entries(cuenta).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([c]) => c) };
      });
      out[slug].archivos = [...fuentes].slice(0, 8);
    } catch (e) { out[slug] = { error: e.message }; }
    console.log(slug, JSON.stringify(out[slug]));
    await p.context().close();
  }
  require('fs').writeFileSync('tools/r64-marca.json', JSON.stringify(out, null, 1)); await b.close();
})();
