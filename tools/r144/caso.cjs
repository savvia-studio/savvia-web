const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const slug = process.argv[2] || 'neety', w = +(process.argv[3] || 1280);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(`http://localhost:4322/proyectos/${slug}?lenis=0`, { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/r144-caso-${slug}-${w}.png`, fullPage: true });
  console.log(slug, w, H, errs);
  await b.close();
})();
