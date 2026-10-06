const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/library', { waitUntil: 'networkidle' }).catch(() => {}); await p.waitForTimeout(2500);
  for (const id of ['overview', 'secciones', 'prompts', 'color', 'tipografia', 'spacing', 'radios', 'gradiente', 'botones', 'marca', 'componentes']) {
    await p.evaluate((id) => { const e = document.getElementById(id); if (e) e.scrollIntoView({ block: 'start' }); }, id); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/ref118/neety/${id}.jpg`, quality: 65 });
  }
  const txt = await p.evaluate(() => document.body.innerText.slice(0, 6000)); console.log(txt);
  await b.close();
})();
