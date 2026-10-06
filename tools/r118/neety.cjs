const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/library', { waitUntil: 'networkidle' }).catch(() => {}); await p.waitForTimeout(2500);
  await p.screenshot({ path: 'tools/ref118/neety/00-library.jpg', quality: 70 });
  await p.screenshot({ path: 'tools/ref118/neety/00-library-full.jpg', quality: 60, fullPage: true });
  const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => h.includes('/library')))]);
  console.log(JSON.stringify(links.slice(0, 40)));
  let i = 1;
  for (const l of links.slice(0, 14)) { if (l.replace(/\/$/, '').endsWith('/library')) continue; await p.goto(l, { waitUntil: 'networkidle' }).catch(() => {}); await p.waitForTimeout(1500); await p.screenshot({ path: `tools/ref118/neety/${String(i).padStart(2, '0')}.jpg`, quality: 65 }); i++; }
  await b.close();
})();
