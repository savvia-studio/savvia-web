// RONDA 307, 25.ª · Andoni: «actualiza el proyecto de Gravitas porque ha cambiado»: ahora es un laberinto de bola. Se graba jugando (screencast CDP):
// un clic en el tablero y el ratón lo va inclinando por el camino → public/media/lab/gravitas.mp4 + .jpg (1280 × 800, 30 fps, mudo)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://gravitas-hq.vercel.app/', { waitUntil: 'load' }); await p.waitForTimeout(3500);
  const dir = 'tools/grab/gravitas-r307'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(p); const frames = [];
  cdp.on('Page.screencastFrame', async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch {} });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
  await p.mouse.move(470, 400); await p.waitForTimeout(800); await p.mouse.click(470, 400); await p.waitForTimeout(600);
  // el recorrido del ratón: arriba a la derecha (el inicio) y luego en zigzag por el tablero
  // la bola sale arriba a la izquierda: se apunta por delante de ella siguiendo el primer tramo del camino y se mantiene
  const pts = [[880, 135, 1700], [1080, 200, 1500], [1100, 300, 1200], [760, 300, 1500], [640, 360, 1300], [880, 420, 1300], [1100, 470, 1300]];
  let [x, y] = [470, 400];
  for (const [tx, ty, quieto] of pts) { for (let k = 1; k <= 14; k++) { const e = k / 14; await p.mouse.move(x + (tx - x) * e, y + (ty - y) * e); await p.waitForTimeout(30); } x = tx; y = ty; await p.waitForTimeout(quieto); }
  await p.waitForTimeout(800);
  await cdp.send('Page.stopScreencast');
  const lista = []; frames.forEach((f, i) => { const fn = path.join(dir, `f${String(i).padStart(5, '0')}.jpg`); fs.writeFileSync(fn, Buffer.from(f.data, 'base64')); const d = (frames[i + 1]?.ts ?? f.ts + 0.033) - f.ts; lista.push(`file '${path.basename(fn)}'\nduration ${Math.max(0.001, d).toFixed(4)}`); });
  fs.writeFileSync(path.join(dir, 'lista.txt'), lista.join('\n'));
  execSync(`ffmpeg -loglevel error -y -f concat -safe 0 -i ${dir}/lista.txt -t 13 -vf "fps=30,scale=1280:800:flags=lanczos,format=yuv420p" -c:v libx264 -crf 26 -preset slow -movflags +faststart -an public/media/lab/gravitas.mp4`);
  execSync(`ffmpeg -loglevel error -y -ss 6 -i public/media/lab/gravitas.mp4 -frames:v 1 -q:v 3 public/media/lab/gravitas.jpg`);
  console.log('fotogramas', frames.length, fs.statSync('public/media/lab/gravitas.mp4').size);
  await b.close();
})();
