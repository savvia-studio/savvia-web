const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent, recordVideo: { dir: 'tools/shots/r120-video', size: { width: 1280, height: 720 } } });
  const p = await ctx.newPage(); await p.goto('http://localhost:4321/?carga=0&lenis=0', { waitUntil: 'networkidle' }); await p.waitForTimeout(16000);
  await ctx.close(); await b.close();
})();
