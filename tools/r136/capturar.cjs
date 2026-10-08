const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const S = { kuanta: 'https://multiverse-home.vercel.app/', arkdev: 'https://zernio.treseiscero.app/', playground: 'https://playground-iep-two.vercel.app/home-v5.html', neety: 'https://neety.treseiscero.app/home' };
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [slug, url] of Object.entries(S)) {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
    const p = await c.newPage();
    await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(7000);
    await p.addStyleTag({ content: '[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[id*="usercentrics"],#CybotCookiebotDialog{display:none!important}' });
    await p.waitForTimeout(500);
    const png = await p.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 900 } });
    for (const q of [80, 70, 60, 50]) {
      const buf = await sharp(png).webp({ quality: q }).toBuffer();
      if (buf.length <= 200000 || q === 50) { await sharp(buf).toFile(`public/media/proyectos/${slug}.webp`); console.log(slug, q, buf.length); break; }
    }
    await c.close();
  }
  await b.close();
})();
