// Ronda 19 · punto 9: vídeo de cada web de «Otros trabajos» (Chrome real, screencast CDP mientras se recorre la página) → mp4 corto para el hover.
// node tools/grabar-otros.cjs [slug]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const FPS = 24, DUR = 8000;
const SITIOS = [
  { slug: 'invopop', url: 'https://invopop.com', w: 1440, h: 900 },
  { slug: 'business-online-payroll', url: 'https://businessonlinepayroll.com', w: 1440, h: 900 },
  { slug: 'cubbo', url: 'https://cubbo.com', w: 1440, h: 900 },
  { slug: 'remerge', url: 'https://remerge.io', w: 390, h: 844, movil: true },
  { slug: 'isotrol', url: 'https://isotrol.com', w: 1440, h: 900 },
];
const solo = process.argv[2];
(async () => {
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args, '--window-size=1440,900'] });
  for (const s of SITIOS) {
    if (solo && s.slug !== solo) continue;
    const ctx = await b.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1, userAgent: s.movil ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' : userAgent, isMobile: !!s.movil, hasTouch: !!s.movil });
    const p = await ctx.newPage();
    try {
      await p.goto(s.url, { waitUntil: 'load', timeout: 45000 });
      await p.waitForTimeout(2500);
      // aceptar cookies si hay un botón evidente (no personal data)
      for (const t of ['Accept all', 'Aceptar todo', 'Aceptar todas', 'I accept', 'Accept cookies', 'Accept all cookies', 'Accept', 'Aceptar', 'Allow all', 'OK', 'Got it', 'I agree']) {
        const btn = p.getByRole('button', { name: new RegExp('^' + t + '$', 'i') }).first();
        if (await btn.count()) { try { await btn.click({ timeout: 800 }); await p.waitForTimeout(400); break; } catch {} }
      }
      const dir = path.join('tools/grab', s.slug); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
      const cdp = await ctx.newCDPSession(p); const frames = [];
      cdp.on('Page.screencastFrame', async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch {} });
      await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: s.w, maxHeight: s.h, everyNthFrame: 1 });
      // recorrido: 1,5 s quieto, luego scroll suave hasta ~2,2 pantallas, y quieto al final
      const t0 = Date.now();
      await p.waitForTimeout(1500);
      const max = await p.evaluate(() => Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.2));
      while (Date.now() - t0 < DUR - 1200) {
        const k = Math.min(1, (Date.now() - t0 - 1500) / (DUR - 2700)); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        await p.evaluate((y) => scrollTo(0, y), max * e); await p.waitForTimeout(30);
      }
      await p.waitForTimeout(1200);
      await cdp.send('Page.stopScreencast');
      const start = frames[0].ts, end = frames[frames.length - 1].ts, N = Math.floor((end - start) * FPS); let k = 0;
      for (let i = 0; i < N; i++) { const t = start + i / FPS; while (k + 1 < frames.length && frames[k + 1].ts <= t) k++; fs.writeFileSync(path.join(dir, 'f' + String(i).padStart(4, '0') + '.jpg'), Buffer.from(frames[k].data, 'base64')); }
      const outW = s.movil ? 390 : 960;
      execSync(`/opt/homebrew/bin/ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -vf "scale=${outW}:-2" -c:v libx264 -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart -an public/media/anteriores/video/${s.slug}.mp4`);
      // y el póster = primer fotograma
      execSync(`/opt/homebrew/bin/ffmpeg -y -loglevel error -i ${dir}/f0000.jpg -vf "scale=${outW}:-2" public/media/anteriores/video/${s.slug}.jpg`);
      console.log(s.slug, 'frames', frames.length, '→', N, 'scroll', Math.round(max), (fs.statSync(`public/media/anteriores/video/${s.slug}.mp4`).size / 1024).toFixed(0) + 'K');
    } catch (e) { console.log(s.slug, 'ERROR', String(e).slice(0, 200)); }
    await ctx.close();
  }
  await b.close();
})();
