const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  const cdp = await p.context().newCDPSession(p);
  const frames = [];
  cdp.on('Page.screencastFrame', async (f) => { frames.push({ t: Date.now(), d: f.data }); await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 60, maxWidth: 720, maxHeight: 450, everyNthFrame: 1 });
  const t0 = Date.now();
  await p.goto('https://www.off.site/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(7000);
  await cdp.send('Page.stopScreencast');
  const fs = require('fs');
  // 16 fotogramas repartidos
  const pick = []; const n = frames.length; for (let i = 0; i < 16; i++) pick.push(frames[Math.floor(i * (n - 1) / 15)]);
  pick.forEach((f, i) => fs.writeFileSync(`tools/ref15/off-${String(i).padStart(2, '0')}.jpg`, Buffer.from(f.d, 'base64')));
  console.log(n, pick.map((f) => f.t - t0).join(','));
  console.log(await p.evaluate(() => document.title));
  await b.close();
})();
