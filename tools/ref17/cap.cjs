const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://www.northmail.app/', { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(4000);
  // bajar despacio para que carguen los lazys
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 700) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(250); }
  const info = await p.evaluate(() => { const el = [...document.querySelectorAll('h1,h2,h3')].find((e) => /Channels designed/i.test(e.textContent)); if (!el) return null; let s = el; for (let i = 0; i < 6 && s.parentElement && s.offsetHeight < 600; i++) s = s.parentElement; const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: s.offsetHeight, tag: s.tagName, cls: s.className.slice(0, 120) }; });
  console.log(JSON.stringify(info));
  if (info) for (let i = 0; i < 4; i++) { await p.evaluate((y) => scrollTo(0, y), info.top - 80 + i * 620); await p.waitForTimeout(1200); await p.screenshot({ path: `tools/ref17/nm-${i}.jpg`, type: 'jpeg', quality: 78 }); }
  await b.close();
})();
