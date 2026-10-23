// Favicon «igual que en el hero»: se fotografía el roble tal cual lo pinta el hero (motor estela.ts: color, semitono, estelas) y se le saca el
// fondo por diferencia: dos capturas del mismo fotograma, sobre negro y sobre blanco → alfa = 1 − (blanco − negro). Una por estación.
// node tools/favicon-arbol/capturar.cjs <url base, p. ej. http://localhost:4332> [carpeta de salida] [--recortar: solo rehace los favicons desde tools/favicon-arbol/hero-<estación>.png]
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const [, , BASE = 'http://localhost:4332', OUT = 'public'] = process.argv;
const EST = ['otono', 'invierno', 'primavera', 'verano'];
// a 16–32 px el árbol entero (apaisado, con estelas) queda diminuto: se recorta a su MASA (copa y tronco, sin las estelas sueltas de los lados) y
// se encaja en un cuadrado casi a sangre, un poco más contrastado para que se lea en pequeño
async function guardar(todo, e) {
  const { data, info } = await sharp(todo).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, col = new Array(W).fill(0), fil = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 170) { col[x]++; fil[y]++; }
  let t = 0; while (fil[t] < W * 0.03) t++;
  let bo = H - 1; while (fil[bo] < W * 0.03) bo--;
  // columnas con masa de verdad; el invierno (ramas finas, sin hojas) con un umbral más bajo
  const umbral = (k) => { let a = 0; while (col[a] < H * k) a++; let b = W - 1; while (col[b] < H * k) b--; return [a, b]; };
  let [a, b] = umbral(0.2);
  if (b - a < (bo - t) * 0.7) [a, b] = umbral(0.04);
  const alto = bo - t + 1, cx = (a + b) / 2, ancho = Math.min(b - a + 1, Math.round(alto * 1.12));
  const izq = Math.max(0, Math.round(cx - ancho / 2));
  const masa = await sharp(todo).extract({ left: izq, top: t, width: Math.min(ancho, W - izq), height: alto }).modulate({ saturation: 1.15 }).linear(1.08, -8).png().toBuffer();
  for (const [n, sufijo] of [[64, ''], [32, '-32']]) {
    const pad = Math.round(n * 0.03);
    await sharp(masa).resize(n - pad * 2, n - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(`${OUT}/favicon-${e}${sufijo}.png`);
  }
}
(async () => {
  if (process.argv[4] === '--recortar') { for (const e of EST) await guardar(await sharp(`tools/favicon-arbol/hero-${e}.png`).toBuffer(), e); return; }
  const b = await chromium.launch(launchOpts || {});
  for (const e of EST) {
    const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
    await p.goto(`${BASE}/?estacion=${e}&carga=0`, { waitUntil: 'load' });
    await p.waitForTimeout(7000); // que termine de dibujarse y pintarse
    // se congela el fotograma y se deja solo el lienzo del árbol
    const caja = await p.evaluate(() => {
      window.requestAnimationFrame = () => 0;
      const c = document.querySelector('[data-lienzo]');
      const st = document.createElement('style');
      st.textContent = 'html,body{background:#000!important;background-image:none!important} body *{visibility:hidden!important;animation:none!important} [data-lienzo]{visibility:visible!important}';
      document.head.append(st);
      const r = c.getBoundingClientRect();
      return { x: r.left, y: r.top, width: r.width, height: r.height };
    });
    await p.waitForTimeout(300);
    const negro = await p.screenshot({ clip: caja });
    await p.evaluate(() => { document.head.lastChild.textContent = document.head.lastChild.textContent.replace('#000', '#fff'); });
    await p.waitForTimeout(300);
    const blanco = await p.screenshot({ clip: caja });
    const N = await sharp(negro).removeAlpha().raw().toBuffer({ resolveWithObject: true }), B = await sharp(blanco).removeAlpha().raw().toBuffer();
    const { width: W, height: H } = N.info, px = Buffer.alloc(W * H * 4);
    for (let i = 0, j = 0; i < W * H * 3; i += 3, j += 4) {
      const a = 1 - (B[i] - N.data[i] + B[i + 1] - N.data[i + 1] + B[i + 2] - N.data[i + 2]) / (3 * 255);
      const al = Math.max(0, Math.min(1, a));
      for (let k = 0; k < 3; k++) px[j + k] = al > 0.004 ? Math.min(255, Math.round(N.data[i + k] / al)) : 0;
      px[j + 3] = Math.round(al * 255);
    }
    const todo = await sharp(px, { raw: { width: W, height: H, channels: 4 } }).trim({ threshold: 4 }).png().toBuffer();
    await sharp(todo).toFile(`tools/favicon-arbol/hero-${e}.png`); // el árbol entero, por si se quiere volver a recortar (fuera del repositorio)
    await guardar(todo, e);
    console.log(e, W, H);
    await p.close();
  }
  await b.close();
})();
