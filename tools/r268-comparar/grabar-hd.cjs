// RONDA 269 (2.ª) · «que se vean en buena calidad, se ven pixeladas». El vídeo de Playwright y el screencast de Chrome dan 1×. Aquí, CÁMARA LENTA: la página va
// 8 veces más despacio (animaciones CSS/WAAPI con DevTools `Animation.setPlaybackRate`; reloj de JS —performance.now, rAF, Date— escalado con un script de
// inicio) y se hacen capturas reales a DPR 2 tan rápido como se pueda; luego se montan a velocidad normal (concat con duraciones) → 1400 × 880, CRF 18.
// node tools/r268-comparar/grabar-hd.cjs <nombre> <equipo|''>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const BASE = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
const [nombre, eq = ''] = process.argv.slice(2);
const K = +(process.env.LENTO || 8); // cámara lenta (el motor del roble salta fotogramas si pasan menos de 30 ms de su reloj: para él, LENTO=2.5)
const TMP = BASE + 'hd-' + nombre; fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });
const OUT = BASE + 'aficiones-artefacto/vid'; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4332/?carga=0${eq ? '&equipo=' + eq : ''}`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1800);
  await p.evaluate(() => { for (const el of document.querySelectorAll('body *')) if (getComputedStyle(el).position === 'fixed') { el.style.visibility = 'hidden'; el.style.opacity = '0'; } });
  const r = await (await p.$('[data-juntos]')).boundingBox();
  // a partir de aquí, todo 8× más lento: el reloj de JS (desde ahora) y las animaciones del documento
  await p.evaluate((K) => {
    const pn = performance.now.bind(performance), t0 = pn(), dn = Date.now, d0 = dn();
    performance.now = () => t0 + (pn() - t0) / K; Date.now = () => d0 + (dn() - d0) / K;
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => raf((t) => cb(t0 + (t - t0) / K));
    const st = window.setTimeout.bind(window); window.setTimeout = (f, ms = 0, ...a) => st(f, ms * K, ...a);
  }, K);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 / K });
  const marcos = []; let n = 0, grabando = true; const t0 = Date.now();
  const bucle = (async () => { while (grabando) { const t = (Date.now() - t0) / 1000 / K; const f = path.join(TMP, `f${String(n++).padStart(5, '0')}.png`); await p.screenshot({ path: f, clip: { x: 540, y: 150, width: 700, height: 440 } }); marcos.push([f, t]); } })();
  const espera = (s) => p.waitForTimeout(s * 1000 * K);
  await espera(0.3);
  await p.mouse.move(r.x + r.width * 0.39, r.y + r.height * 0.5, { steps: 6 }); await espera(3.6);
  await p.mouse.move(r.x + r.width * 0.58, r.y + r.height * 0.5, { steps: 10 }); await espera(3.6);
  await p.mouse.move(1270, 700, { steps: 6 }); await espera(0.9);
  grabando = false; await bucle; await b.close();
  let lista = '';
  marcos.forEach(([f, t], i) => { const d = i < marcos.length - 1 ? Math.max(0.001, marcos[i + 1][1] - t) : 0.033; lista += `file '${f}'\nduration ${d.toFixed(4)}\n`; });
  lista += `file '${marcos[marcos.length - 1][0]}'\n`;
  fs.writeFileSync(path.join(TMP, 'lista.txt'), lista);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(TMP, 'lista.txt'), '-vf', 'fps=30,scale=1400:880', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${OUT}/${nombre}.mp4`]);
  const dur = marcos[marcos.length - 1][1];
  console.log(nombre, marcos.length, 'fotogramas en', dur.toFixed(1), 's →', (marcos.length / dur).toFixed(0), 'fps ·', Math.round(fs.statSync(`${OUT}/${nombre}.mp4`).size / 1024) + ' KB');
})();
