// VÍDEO DE REDES · el árbol aislado (copa + raíces) creciendo: src/pages/prueba/arbol-video.astro, grabado fotograma a fotograma con un reloj
// VIRTUAL (performance.now y requestAnimationFrame los mueve este script: 30 fps exactos, sin tirones), luego ffmpeg a H.264 para X/Twitter.
// node tools/grabar-arbol.cjs [url-base] [lado px] [fondo rrggbb | -] [estación 0–3] [salida.mp4] [estaciones: segundos entre cambios]
// Con el último argumento, ya crecido pasa por las cuatro estaciones y vuelve a la primera (fondo «-» = la noche de cada estación, como la web).
const { chromium } = require(process.env.PW || require('os').homedir() + '/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs = require('fs'), path = require('path'), os = require('os'), { execSync } = require('child_process');
let [BASE = 'http://localhost:3177', LADO = '1080', FONDO = '', EST = '0', OUT = 'tools/grab/arbol-twitter.mp4', CADA = ''] = process.argv.slice(2);
if (FONDO === '-') FONDO = '';
// reposo · gota y crecimiento · el árbol ya hecho, hirviendo (con estaciones: cuatro cambios, el último pintado del todo y un respiro)
const FPS = 30, ANTES = 0.4, DUR = 1.05 + 3.6 + (CADA ? 2.8 + 3 * +CADA + 3.7 + 2.0 : 3.2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const L = +LADO / 2;
  const ctx = await b.newContext({ viewport: { width: L, height: L }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => {
    let T = 0, cola = [], id = 0;
    performance.now = () => T;
    window.requestAnimationFrame = (f) => { cola.push([++id, f]); return id; };
    window.cancelAnimationFrame = (i) => { cola = cola.filter((c) => c[0] !== i); };
    window.__paso = (ms) => { T += ms; const c = cola; cola = []; for (const [, f] of c) f(T); };
  });
  const p = await ctx.newPage();
  p.on('console', (m) => m.type() === 'error' && console.log('consola:', m.text()));
  await p.goto(`${BASE}/prueba/arbol-video?grabar=1&est=${EST}${FONDO ? '&fondo=' + FONDO : ''}${CADA ? '&estaciones=1&cada=' + CADA : ''}`, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__listo);
  await p.evaluate(() => window.__paso(16));
  await p.waitForTimeout(300);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'arbol-'));
  const N = Math.round((ANTES + DUR) * FPS);
  for (let i = 0; i < N; i++) {
    if (i === Math.round(ANTES * FPS)) await p.evaluate(() => window.__empezar());
    await p.evaluate((ms) => window.__paso(ms), 1000 / FPS);
    await p.evaluate(() => new Promise((ok) => setTimeout(ok, 0)));
    await p.screenshot({ path: path.join(dir, 'f' + String(i).padStart(4, '0') + '.png') });
    if (i % 30 === 0) process.stdout.write(`${i}/${N} `);
  }
  await b.close();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.png -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 16 -preset slow -r ${FPS} -movflags +faststart -an ${OUT}`);
  console.log('\n' + OUT, N, 'fotogramas ·', (fs.statSync(OUT).size / 1024 / 1024).toFixed(1) + ' MB · fotogramas en', dir);
})();
