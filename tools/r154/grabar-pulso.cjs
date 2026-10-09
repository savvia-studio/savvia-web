// Ronda 154 · «en el lab añade savvia-pulso.vercel.app»: la web pide una canción → se le da una (Lobby Time, Kevin MacLeod, CC BY) por su campo de archivo,
// se espera a que suene y se graba (screencast CDP) mientras se recorre → public/media/lab/pulso.mp4 + .jpg (1280 × 800, 30 fps, mudo).
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const CANCION = '/Users/andonimart/Desktop/savvia/savvia-web/public/media/sonido/jazz-lobby-time.mp3';
(async () => {
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args, '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://savvia-pulso.vercel.app/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const inp = p.locator('input[type=file]').nth(1); // la primera (#archivo) no arranca la canción
  console.log('inputs', await p.locator('input[type=file]').count());
  await inp.setInputFiles(CANCION);
  await p.waitForTimeout(3500);
  const dir = 'tools/grab/pulso'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(p); const frames = [];
  cdp.on('Page.screencastFrame', async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch {} });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
  const DUR = 14000, t0 = Date.now();
  await p.waitForTimeout(3000);
  const max = await p.evaluate(() => Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 3));
  while (Date.now() - t0 < DUR - 2500) { const k = Math.min(1, (Date.now() - t0 - 3000) / (DUR - 5500)); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; await p.evaluate((y) => scrollTo(0, y), max * e); await p.waitForTimeout(30); }
  await p.waitForTimeout(2500);
  await cdp.send('Page.stopScreencast');
  // remuestreo a 30 fps con duraciones reales
  const lista = []; frames.forEach((f, i) => { const fn = path.join(dir, `f${String(i).padStart(5, '0')}.jpg`); fs.writeFileSync(fn, Buffer.from(f.data, 'base64')); const d = (frames[i + 1]?.ts ?? f.ts + 0.033) - f.ts; lista.push(`file '${path.basename(fn)}'\nduration ${Math.max(0.001, d).toFixed(4)}`); });
  fs.writeFileSync(path.join(dir, 'lista.txt'), lista.join('\n'));
  execSync(`ffmpeg -loglevel error -y -f concat -safe 0 -i ${dir}/lista.txt -vf "fps=30,scale=1280:800:flags=lanczos,format=yuv420p" -c:v libx264 -crf 26 -preset slow -movflags +faststart -an public/media/lab/pulso.mp4`);
  execSync(`ffmpeg -loglevel error -y -ss 4 -i public/media/lab/pulso.mp4 -frames:v 1 -q:v 3 public/media/lab/pulso.jpg`);
  console.log('frames', frames.length, fs.statSync('public/media/lab/pulso.mp4').size);
  await b.close();
})();
