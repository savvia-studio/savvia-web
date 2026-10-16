// RONDA 206 · Andoni: «te paso para poner nuevos movimientos míos y de Eric» (~/Desktop/animaciones-web-30fps.zip → tools/r206/fuente, fuera de git):
// baloncesto = Andoni, fútbol = Eric (un pase con el pie bajo). 61 PNG por persona a 30 fps (2,03 s), 256 × 384, alfa; el último repite el primero
// (no se usa: 60 fotogramas). El primero es la pose de reposo: se encaja sobre su mitad de la foto como en la ronda 189 (copia de su montar.cjs).
// El 01 se encaja sobre su mitad de la foto real (juntos-r140.webp: alto, pecho y pies, y luego el máximo solape de máscaras, tools/r141-equipo/ajuste.cjs).
// Todos los fotogramas llevan la MISMA escala y sitio que el 01 (salen del mismo encuadre): así el salto del tiro o la patada se ven como son, sin
// interpolar los pies. Cada uno, recortado a su silueta y reducido a ~1,25 px por px de la foto. → public/media/equipo/r206/ + montaje.json
const sharp = require('sharp'), fs = require('fs'), path = require('path');
const { rgba } = require('../r141-equipo/medir.cjs'); const { mascaraFoto, ajustar } = require('../r141-equipo/ajuste.cjs');
const SRC = 'tools/r206/fuente', OUT = 'public/media/equipo/r206'; fs.mkdirSync(OUT, { recursive: true });
const A = (im, x, y) => im.data[(y * im.w + x) * 4 + 3] > 40;
function caja(im, x0 = 0, x1 = im.w) { let t = 1e9, b = -1, l = 1e9, r = -1; for (let y = 0; y < im.h; y++) for (let x = x0; x < x1; x++) if (A(im, x, y)) { t = Math.min(t, y); b = Math.max(b, y); l = Math.min(l, x); r = Math.max(r, x); }
  const H = b - t; let s = 0, n = 0; for (let y = t + Math.round(H * 0.2); y <= t + Math.round(H * 0.34); y++) for (let x = x0; x < x1; x++) if (A(im, x, y)) { s += x; n++; }
  return { l, t, r, b, H, pecho: s / n }; }
const r3 = (v) => +v.toFixed(3);
// ronda 206: los intermedios traen motas sueltas (una junto a los pies de Andoni): se borra todo lo que no esté unido a la figura (componentes con
// menos del 2 % del área de la mayor), y se trabaja sobre ese PNG limpio
async function limpio(ruta) {
  const { data, info } = await sharp(ruta).ensureAlpha().raw().toBuffer({ resolveWithObject: true }); const { width: w, height: h } = info;
  const et = new Int32Array(w * h).fill(-1), areas = []; const pila = [];
  for (let s = 0; s < w * h; s++) { if (et[s] >= 0 || data[s * 4 + 3] <= 8) continue; const id = areas.length; let n = 0; et[s] = id; pila.push(s);
    while (pila.length) { const q = pila.pop(); n++; const x = q % w, y = (q / w) | 0;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue; const r = Y * w + X; if (et[r] < 0 && data[r * 4 + 3] > 8) { et[r] = id; pila.push(r); } } }
    areas.push(n); }
  const mx = Math.max(...areas);
  for (let s = 0; s < w * h; s++) if (et[s] >= 0 && areas[et[s]] < mx * 0.02) data[s * 4 + 3] = 0;
  const out = ruta.replace(/\.png$/, '.limpio.png'); await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toFile(out); return out;
}
(async () => {
  const foto = await rgba('public/media/equipo/juntos-r140.webp');
  const series = { a: { dir: 'baloncesto', x0: 0, x1: 568, cabeza: 300 }, e: { dir: 'futbol', x0: 568, x1: 1200, cabeza: 230 } };
  const res = {};
  for (const [k, S] of Object.entries(series)) {
    const F = caja(foto, S.x0, S.x1), M = await mascaraFoto(S.x0, S.x1);
    const ps = await Promise.all(Array.from({ length: 60 }, (_, i) => limpio(path.join(SRC, S.dir, `frame_${String(i).padStart(3, '0')}.png`))));
    const im0 = await rgba(ps[0]), f0 = caja(im0), s0 = F.H / f0.H;
    const fit = await ajustar(ps[0], M, s0, F.pecho - f0.pecho * s0, F.b - f0.b * s0, S.cabeza);
    const red = Math.min(1, fit.s * 1.25), marcos = [];
    for (let i = 0; i < 60; i++) {
      const im = i ? await rgba(ps[i]) : im0, c = caja(im);
      const l = Math.max(0, c.l - 3), t = Math.max(0, c.t - 3), w = Math.min(im.w, c.r + 4) - l, h = Math.min(im.h, c.b + 4) - t;
      const nom = `${k}-gesto-${String(i + 1).padStart(2, '0')}.webp`;
      await sharp(ps[i]).extract({ left: l, top: t, width: w, height: h }).resize({ width: Math.round(w * red) }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/${nom}`);
      marcos.push({ src: `/media/equipo/r206/${nom}`, x: r3((fit.X + l * fit.s) / 12), y: r3((fit.Y + t * fit.s) / 10), w: r3((w * fit.s) / 12), h: r3((h * fit.s) / 10) });
    }
    res[k] = { s: r3(fit.s), iou: r3(fit.iou), marcos };
    console.log(k, S.dir, 'escala', r3(fit.s), 'solape', r3(fit.iou), 'arriba mín', Math.min(...marcos.map((m) => m.y)), '% · abajo máx', Math.max(...marcos.map((m) => m.y + m.h)), '%');
  }
  fs.writeFileSync('tools/r206/montaje.json', JSON.stringify(res, null, 1));
})();
