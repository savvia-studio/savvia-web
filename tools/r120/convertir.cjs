const sharp = require('sharp'); const path = require('path');
const SRC = 'tools/r120/bucles/savvia-orquesta-bucles-v01';
(async () => {
  for (const capa of ['director', 'musicos']) for (let i = 1; i <= 5; i++) {
    const n = String(i).padStart(2, '0');
    const out = `public/media/hero/bucle/${capa}-${n}.webp`;
    await sharp(`${SRC}/${capa}/${n}.png`).resize(1672, 941, { fit: 'fill' }).webp({ quality: 86, alphaQuality: 100 }).toFile(out);
  }
  // ¿el 01 coincide con la capa actual? (diferencia media de alfa y de color)
  for (const [capa, actual] of [['director', 'clasico-director'], ['musicos', 'clasico-musicos']]) {
    const a = await sharp(`public/media/hero/bucle/${capa}-01.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const b = await sharp(`public/media/hero/${actual}.webp`).resize(1672, 941, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
    let da = 0, dc = 0, n = 0; for (let i = 0; i < b.length; i += 4) { da += Math.abs(a.data[i + 3] - b[i + 3]); if (a.data[i + 3] > 128 && b[i + 3] > 128) { dc += Math.abs(a.data[i] - b[i]) + Math.abs(a.data[i + 1] - b[i + 1]); n++; } }
    console.log(capa, 'alfa medio', (da / (b.length / 4)).toFixed(2), 'color', (dc / Math.max(1, n) / 2).toFixed(1));
  }
  // cuánto cambia entre poses (por capa)
  for (const capa of ['director', 'musicos']) { const r = []; for (let i = 2; i <= 5; i++) { const a = await sharp(`public/media/hero/bucle/${capa}-0${i - 1}.webp`).ensureAlpha().raw().toBuffer(); const b = await sharp(`public/media/hero/bucle/${capa}-0${i}.webp`).ensureAlpha().raw().toBuffer(); let d = 0; for (let k = 3; k < a.length; k += 4) d += Math.abs(a[k] - b[k]) > 64 ? 1 : 0; r.push((d / (a.length / 4) * 100).toFixed(2) + '%'); } console.log(capa, 'cambio de silueta entre poses', r.join(' ')); }
})();
