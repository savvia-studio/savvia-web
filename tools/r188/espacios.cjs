// RONDA 188 · Andoni: «podríamos poner el sistema de espaciados también, para que todo se vea dónde está». Mide el ESPACIADO REAL de cada web
// (estilos computados a 1440 px, la página entera recorrida): cada relleno, margen y hueco (gap) de los elementos visibles, cuántas veces sale y
// para qué se usa más; el paso base (4 u 8), el aire entre secciones y el ancho del contenedor. → tools/r188/espacios.json
// node tools/r188/espacios.cjs [slug]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const fs = require('fs'), path = require('path');
const webs = [ // las mismas de la escala tipográfica (tools/r153/escala.cjs); Invopop no: invopop.com ya no es la web entregada
  ['kuanta', 'file:///Users/andonimart/Desktop/Claude%20Code/multiverse-home/dist/index.html'],
  ['arkdev', 'https://zernio.treseiscero.app/', 'arkdev'],
  ['playground', 'https://playgroundiep.com/'],
  ['neety', 'https://neety.treseiscero.app/home'],
  ['business-online-payroll', 'https://businessonlinepayroll.com/'],
  ['cubbo', 'https://cubbo.com/'],
  ['remerge', 'https://remerge.io/'],
  ['isotrol', 'https://isotrol.com/'],
];
const OUT = path.join(__dirname, 'espacios.json');
(async () => {
  const b = await chromium.launch(launchOpts); const res = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  for (const [slug, url, marca] of webs) {
    if (process.argv[2] && process.argv[2] !== slug) continue;
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent }); if (marca) await B.preparar(ctx, marca);
    const p = await ctx.newPage();
    try {
      await p.goto(url, { waitUntil: 'load', timeout: 45000 }); await p.waitForTimeout(2500);
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(90); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
      res[slug] = await p.evaluate(() => {
        const muestras = {}, apunta = (v, uso) => { const px = Math.round(parseFloat(v)); if (!(px >= 2 && px <= 320)) return; const m = (muestras[px] ??= { px, n: 0, uso: {} }); m.n++; m.uso[uso] = (m.uso[uso] || 0) + 1; };
        const secciones = [], contenedores = {};
        for (const e of document.querySelectorAll('body *')) {
          const r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8) continue;
          const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
          const ancho = r.width >= innerWidth * 0.9 && r.height > 360;
          if (ancho && parseFloat(cs.paddingTop) >= 40) secciones.push(Math.round(parseFloat(cs.paddingTop)));
          if (r.width >= 880 && r.width < innerWidth - 40 && Math.abs(r.left - (innerWidth - r.right)) < 2 && r.height > 100) contenedores[Math.round(r.width)] = (contenedores[Math.round(r.width)] || 0) + 1;
          if (!ancho) { apunta(cs.paddingTop, 'relleno'); apunta(cs.paddingBottom, 'relleno'); apunta(cs.paddingLeft, 'relleno'); apunta(cs.paddingRight, 'relleno'); }
          apunta(cs.marginTop, 'margen'); apunta(cs.marginBottom, 'margen');
          if (/flex|grid/.test(cs.display)) { if (cs.rowGap !== 'normal') apunta(cs.rowGap, 'hueco'); if (cs.columnGap !== 'normal') apunta(cs.columnGap, 'hueco'); }
        }
        const lista = Object.values(muestras).sort((a, b) => b.n - a.n), total = lista.reduce((s, m) => s + m.n, 0);
        const div = (k) => lista.reduce((s, m) => s + (m.px % k === 0 ? m.n : 0), 0) / total;
        const mediana = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
        const cont = Object.entries(contenedores).sort((a, b) => b[1] - a[1])[0];
        return { total, de8: +div(8).toFixed(2), de4: +div(4).toFixed(2), seccion: mediana(secciones), contenedor: cont ? +cont[0] : null, lista: lista.slice(0, 40) };
      });
      console.log(slug, res[slug].total, 'muestras · 4:', res[slug].de4, '8:', res[slug].de8, '· sección', res[slug].seccion, '· contenedor', res[slug].contenedor, '·', res[slug].lista.slice(0, 12).map((m) => `${m.px}×${m.n}`).join(' '));
    } catch (e) { console.log(slug, 'ERROR', e.message); }
    await ctx.close();
  }
  await b.close(); fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
})();
