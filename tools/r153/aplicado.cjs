// Ronda 153 · EL SISTEMA, aplicado: recorta de cada web publicada el titular + su texto + su botón (la unión de sus cajas), con su fuente real.
// Sin avisos de cookies. → public/media/obra/<slug>/aplicado.webp (y una copia en tools/r153/shots)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('/Users/andonimart/Desktop/savvia/savvia-web-main/node_modules/sharp');
const webs = { quantus: 'https://quantus-demo.vercel.app/', patchbay: 'https://patchbay-web.vercel.app/', kuanta: 'file:///Users/andonimart/Desktop/Claude%20Code/multiverse-home/dist/index.html', arkdev: 'https://zernio.treseiscero.app/', playground: 'https://playgroundiep.com/', neety: 'https://neety.treseiscero.app/home', invopop: 'https://invopop.com/', 'business-online-payroll': 'https://businessonlinepayroll.com/', cubbo: 'https://cubbo.com/', remerge: 'https://remerge.io/', isotrol: 'https://isotrol.com/' };
// ajustes por web: el texto exacto del botón cuando el automático no lo encuentra, y el margen de arriba
const ajustes = { playground: { btn: 'Create Free Account', p: 'AI tools for IEP', centrar: true }, arkdev: { arriba: 14 }, patchbay: { arriba: 14 }, neety: { btn: 'Solicitar demo', n: 1 } };
// business-online-payroll: su hero no tiene texto ni botón junto al titular (va sobre la foto): sin ejemplo aplicado
const lista = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(webs);
(async () => {
  for (const slug of lista) {
    const b = await chromium.launch(launchOpts);
    try {
      const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent, deviceScaleFactor: 2 })).newPage();
      await p.goto(webs[slug], { waitUntil: 'load', timeout: 45000 });
      await p.addStyleTag({ content: '[id*=cookie i],[class*=cookie i],[id*=usercentrics i],#usercentrics-root,[class*=consent i],[id*=consent i],[class*=Cookie],#CybotCookiebotDialog{display:none!important}' });
      await p.waitForTimeout(5500);
      await p.evaluate(() => { const h = [...document.querySelectorAll('h1')].find((e) => e.getBoundingClientRect().width > 20); if (h) h.scrollIntoView({ block: 'center' }); });
      await p.waitForTimeout(1500);
      const caja = await p.evaluate((aj) => {
        const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 20 && r.height > 8 && s.visibility !== 'hidden' && +s.opacity > 0.5; };
        const h1 = [...document.querySelectorAll('h1')].find(vis); if (!h1) return null;
        const r1 = h1.getBoundingClientRect();
        const cerca = (e) => { const r = e.getBoundingClientRect(); return r.top >= r1.top && r.top < r1.bottom + 380 && r.left < r1.right + 200 && r.right > r1.left - 200; };
        const p = aj.p ? [...document.querySelectorAll('p,div')].find((e) => vis(e) && e.children.length === 0 && e.innerText.trim().startsWith(aj.p)) : [...document.querySelectorAll('p,div')].find((e) => vis(e) && cerca(e) && e.children.length === 0 && e.innerText.trim().length > 50 && !h1.contains(e));
        const btn = aj.btn ? [...document.querySelectorAll('a,button')].filter((e) => vis(e) && e.innerText.trim() === aj.btn)[aj.n || 0] : [...document.querySelectorAll('a,button')].find((e) => { if (!vis(e) || !cerca(e) || h1.contains(e)) return false; const s = getComputedStyle(e); const t = e.innerText.trim(); return t.length > 2 && t.length < 30 && !/saltar|skip/i.test(t) && (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(s.borderTopWidth) > 0); });
        const rs = [h1, p, btn].filter(Boolean).map((e) => e.getBoundingClientRect());
        const x0 = Math.min(...rs.map((r) => r.left)), y0 = Math.min(...rs.map((r) => r.top)), x1 = Math.max(...rs.map((r) => r.right)), y1 = Math.max(...rs.map((r) => r.bottom));
        const m = 40, mt = aj.arriba ?? m;
        if (aj.centrar) { const c = innerWidth / 2, a = Math.max(c - x0, x1 - c); return { x: c - a - m, y: Math.max(0, y0 - mt), width: 2 * (a + m), height: y1 - y0 + m + mt }; }
        return { x: Math.max(0, x0 - m), y: Math.max(0, y0 - mt), width: Math.min(innerWidth - Math.max(0, x0 - m), x1 - x0 + 2 * m), height: Math.min(innerHeight - Math.max(0, y0 - mt), y1 - y0 + m + mt), hay: { p: !!p, btn: btn ? btn.innerText.trim() : null } };
      }, ajustes[slug] || {});
      console.log(slug, JSON.stringify(caja));
      if (caja) {
        const png = `tools/r153/shots/aplicado-${slug}.png`;
        await p.screenshot({ path: png, clip: { x: caja.x, y: caja.y, width: caja.width, height: caja.height } });
        await sharp(png).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/media/obra/${slug}/aplicado.webp`);
      }
    } catch (e) { console.log(slug, 'ERROR', e.message.slice(0, 100)); }
    await b.close();
  }
})();
