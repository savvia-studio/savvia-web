// RONDA 154 · dónde está cada sección (h1–h3, y en px a 1440) de una web, para encuadrar las tomas. node tools/r154/sondeo.cjs <slug>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const W = require('../r152/webs.cjs');
(async () => { const s = process.argv[2], web = W[s]; const b = await chromium.launch({ ...launchOpts, args: ['--hide-scrollbars', '--window-size=1920,1200'] });
  const ctx = await b.newContext({ viewport: { width: +(process.argv[3] || 1440), height: +(process.argv[3] || 1440) * 0.5625 }, userAgent }); if (web.marca) await B.preparar(ctx, web.marca);
  const p = await ctx.newPage(); await p.goto(web.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(3000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(100); }
  const r = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map((h) => { const b = h.getBoundingClientRect(); return b.height ? `${Math.round(b.top + scrollY)}\t${h.tagName}\t${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60)}` : null; }).filter(Boolean));
  console.log('alto', H); console.log(r.join('\n')); await b.close(); })();
