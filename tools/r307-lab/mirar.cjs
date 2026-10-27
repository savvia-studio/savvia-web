const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, userAgent });
await p.goto('https://gravitas-hq.vercel.app/', { waitUntil: 'load' }); await p.waitForTimeout(3500);
await p.screenshot({ path: 'tools/r307-lab/g0.png' });
const info = await p.evaluate(() => ({ titulo: document.title, alto: document.documentElement.scrollHeight, texto: document.body.innerText.slice(0, 1500), botones: [...document.querySelectorAll('button, a')].filter((e) => e.getBoundingClientRect().width).map((e) => e.textContent.trim()).filter(Boolean).slice(0, 30) }));
console.log(JSON.stringify(info, null, 1));
for (const [i, y] of [[1, 0.25], [2, 0.5], [3, 0.8]]) { await p.evaluate((f) => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), y); await p.waitForTimeout(1500); await p.screenshot({ path: `tools/r307-lab/g${i}.png` }); }
await b.close(); })();
