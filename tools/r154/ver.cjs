// Ronda 154 · capturas de un caso (sin la carga): página entera en tramos y hoja de contacto. node tools/r153/ver.cjs <slug> [ancho]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { execSync } = require('child_process');
const slug = process.argv[2] || 'neety', W = +(process.argv[3] || 1280), H = W < 600 ? 844 : 800;
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4322/proyectos/${slug}?carga=0`, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  const ini = await p.evaluate(() => document.querySelector('#det-h')?.getBoundingClientRect().top + scrollY - 120);
  const fin = await p.evaluate(() => (document.querySelector('.pares')?.getBoundingClientRect().top ?? 0) + scrollY);
  let i = 0;
  for (let y = ini; y < fin; y += H * 0.9) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1300); await p.screenshot({ path: `tools/r154/shots/caso-${slug}-${W}-${String(i++).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 60 }); }
  console.log(slug, W, 'alto', alto, 'tramos', i, 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), errs.slice(0, 3));
  await b.close();
  const n = i, cols = W < 600 ? 6 : 4;
  execSync(`ffmpeg -loglevel error -y -i tools/r154/shots/caso-${slug}-${W}-%02d.jpg -vf "scale=${W < 600 ? 260 : 480}:-1,tile=${cols}x${Math.ceil(n / cols)}" -frames:v 1 tools/r154/shots/hoja-${slug}-${W}.jpg`);
})();
