// Tiras de andar de Andoni y Eric a partir de tools/walk (zip de Andoni). Por fotograma: se conserva SOLO la masa principal de alfa
// (varios traen un trozo del vecino en el borde), se alinea por los pies y se centra en una celda fija. Salida:
//   public/media/equipo/andoni.webp · eric.webp (5 celdas: 4 de paso + 1 girando al frente) · juntos.webp (la pose final)
// Imprime las alturas medidas para que la pose final se enseñe a la MISMA escala que los fotogramas.
const sharp = require('sharp'), fs = require('fs');
const CW = 230, CH = 400;
async function limpia(f, varios = false) {
  const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, lab = new Int32Array(W * H), tam = [0];
  for (let i = 0; i < W * H; i++) {
    if (lab[i] || data[i * 4 + 3] < 24) continue;
    const id = tam.length; let n = 0; const pila = [i]; lab[i] = id;
    while (pila.length) { const p = pila.pop(); n++; const x = p % W, y = (p / W) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue; const q = ny * W + nx; if (!lab[q] && data[q * 4 + 3] >= 24) { lab[q] = id; pila.push(q); } } }
    tam.push(n);
  }
  const mayor = tam.indexOf(Math.max(...tam)), vale = (id) => id === mayor || (varios && id > 0 && tam[id] > tam[mayor] * 0.25); // en la pose final son DOS masas
  let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let i = 0; i < W * H; i++) { if (!vale(lab[i])) data[i * 4 + 3] = 0; else { const x = i % W, y = (i / W) | 0; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } }
  const buf = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png().toBuffer();
  return { buf, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
(async () => {
  fs.mkdirSync('public/media/equipo', { recursive: true });
  // Eric entra por la DERECHA andando a la izquierda: sus fotogramas 7–10 vienen CORTADOS por la derecha en el zip (la pierna de atrás);
  // se usan los 1–4 (completos, andando a la derecha) VOLTEADOS, y el 5 (girando) volteado también.
  const SEC = { andoni: [1, 2, 3, 4, 5], eric: [1, 2, 3, 4, 5] }, VOLTEA = { eric: true }, alt = {};
  for (const [q, sec] of Object.entries(SEC)) {
    const comps = []; alt[q] = [];
    for (const [k, n] of sec.entries()) {
      const c = await limpia(`tools/walk/${q}/${q}_${String(n).padStart(2, '0')}.png`); alt[q].push(c.h);
      if (VOLTEA[q]) c.buf = await sharp(c.buf).flop().toBuffer();
      comps.push({ input: c.buf, left: k * CW + Math.round((CW - c.w) / 2), top: CH - c.h - 4 });
    }
    await sharp({ create: { width: CW * sec.length, height: CH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(comps).webp({ quality: 90, alphaQuality: 100 }).toFile(`public/media/equipo/${q}.webp`);
  }
  const fin = await limpia('tools/walk/final/andoni_eric_final.png', true);
  await sharp(fin.buf).webp({ quality: 92, alphaQuality: 100 }).toFile('public/media/equipo/juntos.webp');
  console.log(JSON.stringify({ celda: [CW, CH], alturas: alt, final: [fin.w, fin.h] }));
})();
