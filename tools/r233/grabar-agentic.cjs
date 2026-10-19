// Ronda 233 · la escena de savvia agentic de ESCRITORIO grabada fotograma a fotograma (window.__partitura.ir(t)) a 1920×1080 para el reel
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [T0 = '2.6', T1 = '15.4', FPS = '30'] = process.argv.slice(2);
(async () => {
  const tmp = path.join(__dirname, 'agentic-fr'); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1.6, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4332/?carga=0&grabando=1', { waitUntil: 'load' });
  await p.addStyleTag({ content: '[data-nav],.cf,.cf-btn,.cf-panel,.carriles,[data-carriles]{display:none!important} .cine{-webkit-mask-image:none!important;mask-image:none!important}' });
  const cine = p.locator('[data-partitura] [data-cine]').first();
  await cine.scrollIntoViewIfNeeded(); await p.waitForTimeout(3500); await p.evaluate(() => document.fonts.ready);
  const N = Math.round((+T1 - +T0) * +FPS);
  for (let i = 0; i < N; i++) {
    await p.evaluate((t) => window.__partitura.ir(t), +T0 + i / +FPS);
    await cine.screenshot({ path: path.join(tmp, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 93 });
    if (i % 60 === 0) console.log(i, '/', N);
  }
  await b.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', FPS, '-i', path.join(tmp, '%05d.jpg'), '-vf', 'scale=1920:1080:flags=lanczos', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', '-an', path.join(__dirname, 'agentic.mp4')]);
  console.log('ok', path.join(__dirname, 'agentic.mp4'));
})();
