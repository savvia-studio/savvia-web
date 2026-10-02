const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] }); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
  const urls = []; p.on('request', (r) => urls.push(r.resourceType() + ' ' + r.url()));
  await p.goto('https://ascii.fm/', { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.mouse.click(640, 400); await p.keyboard.press('Space'); await p.waitForTimeout(6000);
  console.log(urls.filter((u) => !/_next\/static|insights/.test(u)).slice(0, 60).join('\n'));
  const info = await p.evaluate(() => ({ audio: [...document.querySelectorAll('audio,video,iframe')].map((a) => a.outerHTML.slice(0, 200)), txt: document.body.innerText.slice(0, 800) }));
  console.log(JSON.stringify(info, null, 1));
  await b.close();
})();
