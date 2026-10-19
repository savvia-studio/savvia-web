const { webkit, chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const WK = process.argv[2] === 'webkit';
  const b = WK ? await webkit.launch({ headless: true }) : await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: !WK, hasTouch: true, ...(WK ? {} : { userAgent }) })).newPage();
  p.on('pageerror', (e) => console.log('ERR', String(e)));
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('[data-cine]').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(4000);
  const leer = () => p.evaluate(() => [...document.querySelectorAll('[data-cine] video')].map((v) => [v.currentSrc.split('/').pop(), v.readyState, v.paused, v.currentTime.toFixed(1), v.style.visibility, (v.style.getPropertyValue('mask-size') || v.style.mask || '').slice(-40)].join(' ')));
  console.log('antes', await leer());
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  for (let i = 0; i < 6; i++) { await p.waitForTimeout(600); console.log((i + 1) * 600, await leer()); }
  await b.close();
})();
