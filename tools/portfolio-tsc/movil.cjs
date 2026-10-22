// La web de cada proyecto del portfolio, en un móvil (390 × 844, DPR 2, Chrome real con emulación de iPhone) → public/media/portfolio/<slug>-movil.webp.
// Para las piezas verticales del mosaico (el teléfono de pie y el móvil sobre la mesa). node tools/portfolio-tsc/movil.cjs [slug…]
const fs = require('fs'), sharp = require('sharp');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const datos = JSON.parse(fs.readFileSync('src/data/portfolio-tsc.json', 'utf8'));
const extra = [['neety', 'neety.com']]; // Kuanta y Arkdev son marca blanca, sin web pública: van siempre en escritorio
const lista = [...extra, ...datos.map((d) => [d.slug, d.dominio])].filter(([s]) => process.argv.length < 3 || process.argv.slice(2).includes(s));
const ACEPTAR = /^(accept( all)?|aceptar( todo| todas)?|allow all|agree|ok|got it|entendido|i agree)$/i;
(async () => {
  const b = await chromium.launch(launchOpts || {});
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' });
  for (const [slug, dom] of lista) {
    const p = await ctx.newPage();
    try {
      await p.goto(`https://${dom}`, { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(2500);
      // los avisos de cookies: se aceptan si hay botón; si no, se ocultan los más comunes
      for (const el of await p.$$('button, a[role=button], [role=button]')) { const t = ((await el.textContent()) || '').trim(); if (ACEPTAR.test(t) && (await el.isVisible())) { await el.click().catch(() => {}); break; } }
      await p.addStyleTag({ content: '#onetrust-banner-sdk,#CybotCookiebotDialog,.cky-consent-container,#usercentrics-root,.fs-cc-components,[class*=cookie-banner],[id*=cookie-banner],[class*=CookieConsent]{display:none!important}' }).catch(() => {});
      // y los que quedan: cualquier capa fija o pegada que hable de cookies
      await p.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const st = getComputedStyle(el); if ((st.position === 'fixed' || st.position === 'sticky') && /cookie/i.test(el.textContent || '') && (el.textContent || '').length < 1500) el.style.setProperty('display', 'none', 'important'); } }).catch(() => {});
      await p.waitForTimeout(1200);
      const buf = await p.screenshot();
      await sharp(buf).resize({ width: 780 }).webp({ quality: 80 }).toFile(`public/media/portfolio/${slug}-movil.webp`);
      console.log('✓', slug);
    } catch (e) { console.log('✗', slug, String(e.message).split('\n')[0]); }
    await p.close();
  }
  await b.close();
})();
