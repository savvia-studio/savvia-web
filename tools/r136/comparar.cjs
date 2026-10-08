const { webkit } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
(async () => {
  const b = await webkit.launch();
  const c = await b.newContext({ viewport: { width: 1280, height: 720 } });
  await c.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
  const p = await c.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4322/', { waitUntil: 'load' });
  await p.waitForTimeout(3000);
  const sec = p.locator('#proyectos');
  const y = await sec.evaluate((e) => e.getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => window.scrollTo(0, y + innerHeight * 1.2), y);
  await p.waitForTimeout(4000);
  const shot = async () => { const bb = await p.locator('.pantalla').first().boundingBox(); return p.screenshot({ clip: bb }); };
  const standing = [];
  for (let i = 0; i < 4; i++) { await p.waitForTimeout(i ? 7500 : 2500); const on = await p.evaluate(() => [...document.querySelectorAll('[data-web]')].findIndex((w) => w.classList.contains('on'))); console.log('de pie paso', i, 'activo', on); standing.push(await shot()); }
  await p.locator('[data-sentarse]').click(); await p.waitForTimeout(4000);
  const sitting = [];
  for (let i = 0; i < 4; i++) { if (i) { await p.locator('[data-otro="1"]').click(); } await p.waitForTimeout(10000); sitting.push(await shot()); }
  const W = 640, H = 350;
  const comps = [];
  for (let i = 0; i < 4; i++) {
    comps.push({ input: await sharp(standing[i]).resize(W, H, { fit: 'cover' }).toBuffer(), left: 0, top: i * H });
    comps.push({ input: await sharp(sitting[i]).resize(W, H, { fit: 'cover' }).toBuffer(), left: W, top: i * H });
  }
  await sharp({ create: { width: W * 2, height: H * 4, channels: 3, background: '#000' } }).composite(comps).jpeg({ quality: 82 }).toFile('/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r136-miniaturas-hoja.jpg');
  console.log('errs', errs);
  await b.close();
})();
