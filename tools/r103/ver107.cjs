// RONDA 103 · brazos del director y saxo a tempo, ondas por compás, el punto de «ver caso de estudio», el cursor y el jazz al sentarse
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '';
const tag = `${motor}-${W}${q.includes('clara') ? '-clara' : ''}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q);
  await p.mouse.click(5, 300); await p.waitForTimeout(5200);
  const lz = await (await p.$('[data-lienzo]')).boundingBox();
  for (let i = 0; i < 6; i++) { await p.screenshot({ path: `tools/shots/r107-brazos-${tag}-${i}.jpg`, quality: 70, clip: { x: lz.x, y: lz.y, width: lz.width, height: lz.height } }); await p.waitForTimeout(150); }
  // el cursor y su rastro
  for (let i = 0; i <= 20; i++) await p.mouse.move(200 + i * 30, 260 + Math.sin(i / 3) * 60);
  await p.waitForTimeout(120); await p.screenshot({ path: `tools/shots/r107-cursor-${tag}.jpg`, quality: 72 });
  await p.waitForTimeout(3000); await p.screenshot({ path: `tools/shots/r107-ondas-${tag}.jpg`, quality: 72 });
  const cursor = await p.evaluate(() => ({ propio: document.documentElement.classList.contains('cursor-propio'), dentro: document.documentElement.classList.contains('cursor-dentro') }));
  // sentarse: el jazz baja
  const antes = await p.evaluate(() => window.__jazz());
  await p.evaluate(() => document.querySelector('[data-estudio]').scrollIntoView()); await p.waitForTimeout(400);
  const pista = await p.evaluate(() => { const s = document.querySelector('[data-estudio]'); return s.getBoundingClientRect().top + scrollY; });
  await p.evaluate((y) => scrollTo(0, y + innerHeight * 1.6), pista); await p.waitForTimeout(2500);
  const de = await p.evaluate(() => window.__jazz().ganancia);
  await p.evaluate(() => document.querySelector('[data-sentarse]').click()); await p.waitForTimeout(6000);
  const sent = await p.evaluate(() => window.__jazz().ganancia);
  const ver = await p.locator('.ficha-ver:visible').first().elementHandle({ timeout: 2000 }).catch(() => null); let punto = null;
  if (ver && await ver.isVisible()) { const vb = await ver.boundingBox(); await p.mouse.move(vb.x + vb.width - 4, vb.y + vb.height / 2, { steps: 6 }); await p.waitForTimeout(260);
    await p.screenshot({ path: `tools/shots/r107-ver-${tag}.jpg`, quality: 75, clip: { x: vb.x - 40, y: vb.y - 60, width: vb.width + 120, height: vb.height + 120 } }); punto = true; }
  await p.keyboard.press('Escape'); await p.waitForTimeout(5000);
  const lev = await p.evaluate(() => window.__jazz().ganancia);
  console.log(JSON.stringify({ tag, errs: errs.filter((e) => !/\{\{ s\.t \}\}/.test(e)).slice(0, 5), cursor, jazz: { tema: antes.tema, dePie: de, sentado: sent, levantado: lev }, punto, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
