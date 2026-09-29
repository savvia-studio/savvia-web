// Ronda 65 · los logotipos de las empresas con las que se ha trabajado, sacados de SU web (el logotipo de la cabecera): svg en línea o imagen.
// node tools/r65-logos.cjs → public/media/logos/<slug>.svg|png
const fs = require('fs');
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const WEBS = { multiverse: 'https://multiversecomputing.com', codely: 'https://codely.com', monad: 'https://www.monad.com', minimum: 'https://www.minimum.run', casavo: 'https://casavo.com', routal: 'https://routal.com', transcend: 'https://www.transcend-network.com', playground: 'https://playgroundiep.com', thx: 'https://thx.vision', kalma: 'https://somoskalma.com', vitalera: 'https://vitalera.io', webflow: 'https://webflow.com' };
fs.mkdirSync('public/media/logos', { recursive: true });
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [slug, url] of Object.entries(WEBS)) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 }); await p.waitForTimeout(3500);
      const r = await p.evaluate(() => {
        const cand = [...document.querySelectorAll('header svg, nav svg, a svg, header img, nav img, a img, svg, img')].filter((e) => { const b = e.getBoundingClientRect(); return b.top < 110 && b.top >= 0 && b.left < 420 && b.width > 40 && b.height > 10 && b.height < 90; });
        const e = cand[0]; if (!e) return null;
        const bb = e.getBoundingClientRect();
        if (e.tagName.toLowerCase() === 'svg') { const c = e.cloneNode(true); c.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); if (!c.getAttribute('viewBox')) c.setAttribute('viewBox', `0 0 ${bb.width} ${bb.height}`); return { svg: c.outerHTML, w: bb.width, h: bb.height }; }
        return { src: e.currentSrc || e.src, w: bb.width, h: bb.height };
      });
      if (!r) { console.log(slug, 'SIN LOGO'); continue; }
      if (r.svg) { fs.writeFileSync(`public/media/logos/${slug}.svg`, r.svg); console.log(slug, 'svg', Math.round(r.w), Math.round(r.h)); }
      else { const res = await p.request.get(r.src); const ext = /svg/.test(res.headers()['content-type'] || r.src) ? 'svg' : 'png'; fs.writeFileSync(`public/media/logos/${slug}.${ext}`, await res.body()); console.log(slug, ext, r.src.slice(0, 90), Math.round(r.w), Math.round(r.h)); }
    } catch (e) { console.log(slug, 'ERROR', String(e).slice(0, 80)); }
    await p.close();
  }
  await b.close();
})();
