// Ronda 153 · todos los estilos de texto de una web (página entera, 1440 px), agrupados por familia · tamaño · peso · interlineado,
// con cuántos caracteres usa cada uno; y los botones (enlaces con fondo, sin «saltar al contenido»). → tools/r153/estilos.json
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
const webs = { kuanta: 'file:///Users/andonimart/Desktop/Claude%20Code/multiverse-home/dist/index.html', arkdev: 'https://zernio.treseiscero.app/', playground: 'https://playgroundiep.com/', neety: 'https://neety.treseiscero.app/home', invopop: 'https://invopop.com/', 'business-online-payroll': 'https://businessonlinepayroll.com/', cubbo: 'https://cubbo.com/', remerge: 'https://remerge.io/', isotrol: 'https://isotrol.com/' };
const lista = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(webs);
(async () => {
  const f = 'tools/r153/estilos.json';
  const out = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : {};
  for (const slug of lista) {
    const b = await chromium.launch(launchOpts);
    try {
      const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
      await p.goto(webs[slug], { waitUntil: 'load', timeout: 45000 });
      await p.waitForTimeout(3500);
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(H, 16000); y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
      const r = await p.evaluate(() => {
        const g = {};
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = w.nextNode())) {
          const t = n.nodeValue.trim(); if (t.length < 2) continue;
          const e = n.parentElement; if (!e || e.closest('script,style,noscript,footer,[aria-hidden="true"]')) continue;
          const s = getComputedStyle(e); if (s.visibility === 'hidden' || s.display === 'none') continue;
          const lh = s.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(s.lineHeight) * 10) / 10;
          const k = [s.fontFamily.split(',')[0].replace(/["']/g, ''), Math.round(parseFloat(s.fontSize) * 10) / 10, s.fontWeight, lh, s.textTransform === 'uppercase' ? 'MAY' : '', s.letterSpacing].join('|');
          g[k] = g[k] || { c: 0, ej: t.slice(0, 40), tag: e.tagName }; g[k].c += t.length;
        }
        const est = Object.entries(g).map(([k, v]) => { const [fam, px, peso, lh, may, ls] = k.split('|'); return { fam, px: +px, peso, lh, may, ls, ...v }; }).filter((x) => x.c > 12).sort((a, b) => b.px - a.px);
        const btns = [...document.querySelectorAll('a,button')].filter((e) => { const s = getComputedStyle(e); const t = e.innerText.trim(); return !/saltar|skip/i.test(t) && t.length > 2 && t.length < 28 && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && e.getBoundingClientRect().width > 40; }).slice(0, 4).map((e) => { const s = getComputedStyle(e); return { t: e.innerText.trim(), fam: s.fontFamily.split(',')[0], px: s.fontSize, peso: s.fontWeight, bg: s.backgroundColor, color: s.color, radio: s.borderRadius, alto: Math.round(e.getBoundingClientRect().height), pad: s.padding }; });
        return { est, btns };
      });
      out[slug] = r;
      console.log('==', slug); r.est.forEach((x) => console.log(`  ${x.fam} ${x.px}/${x.lh} w${x.peso} ${x.may} ls${x.ls} · ${x.c}c · ${x.tag} «${x.ej}»`)); console.log('  BTN', JSON.stringify(r.btns));
    } catch (e) { console.log(slug, 'ERROR', e.message.slice(0, 100)); }
    await b.close();
  }
  fs.writeFileSync(f, JSON.stringify(out, null, 1));
})();
