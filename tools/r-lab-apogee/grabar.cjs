// 30/10 · Andoni: «Lab: mejorar el vídeo de Think Clearly y cambiar el nombre a Apogee; más fluido». El de antes (8/10) era un screencast con el scroll de
// verdad: soltaba fotogramas y la estela iba a tirones. Ahora fotograma a fotograma (como tools/grabar-paso.cjs, ronda 43): en cada uno el scroll se
// pone exacto (Lenis, inmediato), se esperan dos fotogramas y se captura → public/media/lab/apogee.mp4 + .jpg (1280 × 800, 30 fps, mudo)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FPS = 30, DUR = 11, Y1 = 2500; // de arriba hasta que el titular y el campo quedan asentados
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://apogee-invader.vercel.app/', { waitUntil: 'load' }); await p.waitForTimeout(5000);
  const dir = 'tools/grab/apogee-lab'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const ir = (y) => p.evaluate((y) => new Promise((r) => { const l = window.lenis; if (l?.scrollTo) l.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y); requestAnimationFrame(() => requestAnimationFrame(r)); }), y);
  const N = FPS * DUR, quieto = FPS * 1.6, entra = FPS * 0.4;
  for (let i = 0; i < N; i++) {
    // un instante quieto arriba, la subida con curva suave (arranca y frena) y un instante quieto al final
    const k = Math.min(1, Math.max(0, (i - entra) / (N - entra - quieto)));
    const e = (1 - Math.cos(Math.PI * k)) / 2;
    await ir(Math.round(Y1 * e));
    await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 90 });
  }
  execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${dir}/f%04d.jpg -vf "format=yuv420p" -c:v libx264 -crf 24 -preset slow -movflags +faststart -an public/media/lab/apogee.mp4`);
  execSync(`ffmpeg -loglevel error -y -ss 5.5 -i public/media/lab/apogee.mp4 -frames:v 1 -q:v 3 public/media/lab/apogee.jpg`);
  console.log('fotogramas', N, fs.statSync('public/media/lab/apogee.mp4').size);
  await b.close();
})();
