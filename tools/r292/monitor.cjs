// RONDA 292 (oct. 2026) · copia de tools/r160/capturar.cjs para Quantus y Patchbay. RONDA 160 · miniaturas de los destacados a la proporción de la pantalla del monitor: la web a 1710 px (MacBook Air) × 930 (alto de la pantalla a ese ancho).
// Uso: node tools/r160/capturar.cjs   (Chrome de Playwright de Ship Studio)
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const W = 1710, H = 930;
const S = { quantus: 'https://quantus-demo.vercel.app/', patchbay: 'https://patchbay-web.vercel.app/' };
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [slug, url] of Object.entries(S)) {
    const c = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    const p = await c.newPage();
    await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(8000);
    await p.addStyleTag({ content: '[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[id*="usercentrics"],#CybotCookiebotDialog{display:none!important}' });
    // Zernio: fuera su barra de pruebas «HERO · A·Código / B·Esquema»
    await p.evaluate(() => {
      const t = [...document.querySelectorAll('body *')].find((e) => e.children.length < 8 && /A\s*·\s*Código/.test(e.textContent || '') && /B\s*·\s*Esquema/.test(e.textContent || '') && e.getBoundingClientRect().height < 80);
      if (t) { let n = t; while (n.parentElement && n.parentElement.getBoundingClientRect().height < 80) n = n.parentElement; n.style.display = 'none'; }
    });
    await p.waitForTimeout(800);
    const png = await p.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
    for (const q of [80, 70, 60, 50]) {
      const buf = await sharp(png).webp({ quality: q }).toBuffer();
      if (buf.length <= 220000 || q === 50) { await sharp(buf).toFile(`public/media/proyectos/${slug}.webp`); console.log(slug, q, buf.length); break; }
    }
    await c.close();
  }
  await b.close();
})();
