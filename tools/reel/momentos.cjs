// REEL (ronda 60, v2) · «repetimos demasiadas veces las mismas animaciones: buscar de cada web más momentos característicos, no solo el hero».
// Para cada web: se miden sus secciones y en cada una se graba en VIVO (screencast CDP) mientras la sección ENTRA en pantalla con un scroll lento y
// real: así se disparan sus animaciones de entrada. Una toma de ~4 s por sección → tools/reel/momentos/<slug>-mNN.mp4 + hoja de contactos.
// node tools/reel/momentos.cjs <slug|todos>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const G = require('./grabar-comun.cjs');
const FF = '/opt/homebrew/bin/ffmpeg', FPS = 30, TOMA = 4.2, MAX = 9;

async function momentos(b, slug, soloHoja) {
  if (soloHoja) return hoja(slug);
  const s = G.SITIOS[slug], p = await G.abrir(b, s);
  await p.goto(s.url, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(3500); await G.limpiar(p);
  // secciones: arranques de bloques grandes, separados al menos 0,7 pantallas (sin el hero)
  const ys = await p.evaluate((MAX) => {
    const H = innerHeight, alto = document.documentElement.scrollHeight, out = [];
    const cands = [...document.querySelectorAll('section, main > div, main > section, [class*="section"], footer')]
      .map((e) => { const r = e.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), h: r.height }; })
      .filter((c) => c.h > H * 0.45 && c.y > H * 0.6 && c.y < alto - H * 0.5).sort((a, b) => a.y - b.y);
    for (const c of cands) if (!out.length || c.y - out[out.length - 1] > H * 0.7) out.push(c.y);
    if (out.length < 4) { out.length = 0; for (let y = H; y < alto - H; y += H * 1.1) out.push(Math.round(y)); }
    // repartidas por toda la página
    if (out.length > MAX) { const k = out.length / MAX; return Array.from({ length: MAX }, (_, i) => out[Math.floor(i * k)]); }
    return out;
  }, MAX);
  console.log(slug, 'secciones', ys.join(' '));
  const dir = path.join(__dirname, 'momentos'); fs.mkdirSync(dir, { recursive: true });
  const cdp = await p.context().newCDPSession(p);
  for (const [k, y] of ys.entries()) {
    // la sección empieza a asomar por abajo (así su entrada se ve entera)
    const desde = Math.max(0, y - (s.movil ? 780 : 1000)), hasta = y - (s.movil ? 120 : 160);
    await p.evaluate((yy) => { document.scrollingElement.scrollTop = yy; (window.__lenis || window.lenis)?.scrollTo?.(yy, { immediate: true, force: true }); }, desde);
    await p.waitForTimeout(700); await G.limpiar(p);
    const frames = [];
    const oir = (f) => { frames.push({ t: f.metadata.timestamp, d: f.data }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); };
    cdp.on('Page.screencastFrame', oir);
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, everyNthFrame: 1 });
    // scroll lento y real (1,6 s, curva suave) y luego quieto para que terminen las animaciones
    await p.evaluate(([a, z]) => new Promise((ok) => {
      const t0 = performance.now(), D = 1600, L = window.__lenis || window.lenis;
      const paso = (t) => { const k = Math.min(1, (t - t0) / D), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, yy = a + (z - a) * e;
        if (L?.scrollTo) L.scrollTo(yy, { immediate: true, force: true }); else document.scrollingElement.scrollTop = yy;
        if (k < 1) requestAnimationFrame(paso); else ok(); };
      requestAnimationFrame(paso);
    }), [desde, hasta]);
    await p.waitForTimeout((TOMA - 1.6) * 1000);
    await cdp.send('Page.stopScreencast'); cdp.off('Page.screencastFrame', oir);
    if (frames.length < 5) { console.log(slug, k, 'sin fotogramas'); continue; }
    const tmp = path.join('tools/grab/reel-m', `${slug}-m${String(k).padStart(2, '0')}`); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
    const i0 = frames[0].t, N = Math.floor((frames[frames.length - 1].t - i0) * FPS); let j = 0;
    for (let i = 0; i < N; i++) { const t = i0 + i / FPS; while (j + 1 < frames.length && frames[j + 1].t <= t) j++; fs.writeFileSync(path.join(tmp, 'f' + String(i).padStart(4, '0') + '.jpg'), Buffer.from(frames[j].d, 'base64')); }
    const out = path.join(dir, `${slug}-m${String(k).padStart(2, '0')}.mp4`);
    execSync(`${FF} -y -loglevel error -framerate ${FPS} -i ${tmp}/f%04d.jpg -vf "scale=${s.movil ? 1170 : 1920}:-2" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium -an ${out}`);
    console.log(slug, 'm' + k, 'y', y, frames.length, 'fotogramas (' + (frames.length / (frames[frames.length - 1].t - i0)).toFixed(0) + ' fps)');
  }
  await p.context().close();
  hoja(slug);
}
function hoja(slug) {
  const dir = path.join(__dirname, "momentos");
  // hoja de contactos: una fila por momento, 6 fotogramas (0,5 · 1 · 1,5 · 2 · 3 · 4 s)
  const lista = fs.readdirSync(dir).filter((f) => f.startsWith(slug + '-m') && f.endsWith('.mp4')).sort();
  const filas = lista.map((f, i) => { const o = path.join('tools/grab/reel-m', `fila-${slug}-${i}.jpg`);
    execSync(`${FF} -y -loglevel error -i ${path.join(dir, f)} -vf "select='eq(n\\,15)+eq(n\\,30)+eq(n\\,45)+eq(n\\,60)+eq(n\\,90)+eq(n\\,120)',scale=320:-2,tile=6x1" -frames:v 1 -fps_mode passthrough ${o}`); return o; });
  if (filas.length) execSync(`${FF} -y -loglevel error ${filas.map((f) => '-i ' + f).join(' ')} -filter_complex "${filas.map((_, i) => `[${i}:v]`).join('')}vstack=${filas.length}" tools/grab/reel-m/hoja-${slug}.jpg`.replace('vstack=1', 'null'));
}

(async () => {
  const quien = process.argv[2] || 'todos';
  const lista = quien === 'todos' ? Object.keys(G.SITIOS) : quien.split(',');
  const b = await chromium.launch({ ...launchOpts, args: [...launchOpts.args.filter((a) => !a.startsWith('--window-size')), '--window-size=1920,1080'] });
  for (const slug of lista) { try { await momentos(b, slug, process.argv[3] === "hoja"); } catch (e) { console.log(slug, 'FALLO', e.message); } }
  await b.close();
})();
