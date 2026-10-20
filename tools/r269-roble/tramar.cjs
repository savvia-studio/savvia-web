// RONDA 270 · «a las últimas ponles dittering sutil»: el SEMITONO del roble del hero (estela.ts) horneado en las ilustraciones del estilo del roble:
// en los cantos (donde la cobertura baja de ~0,92) el alfa se rompe en puntos redondos en retícula a 45°, con el radio sacado de la cobertura, y se
// mezcla con el original a FUERZA (sutil); además, una trama ordenada finísima en el color (Bayer 4×4, ±2 niveles) para que se lea «impreso».
// node tools/r269-roble/tramar.cjs [fuerza=0.55] → public/media/equipo/roble/<n>.webp (desde los 360 px que deja colocar.cjs)
const sharp = require('sharp');
const FUERZA = +(process.argv[2] || 0.55), CELDA = 11; // px de la imagen de 360 (≈ 2,6 px CSS a 85 px de ancho)
const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16 - 0.5);
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
(async () => {
  for (const n of ['balon', 'mando', 'cafe', 'futbol', 'azada', 'airpods']) {
    const f = `public/media/equipo/roble/${n}.webp`;
    const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, o = Buffer.from(data);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4, a = data[i + 3] / 255;
      if (a < 0.02) continue;
      const rx = (x + y) * 0.7071 / CELDA, ry = (x - y) * 0.7071 / CELDA;
      const fx = rx - Math.floor(rx) - 0.5, fy = ry - Math.floor(ry) - 0.5;
      const rad = Math.sqrt(a) * 0.64, punto = 1 - ss(rad - 0.07, rad + 0.07, Math.hypot(fx, fy));
      const canto = (1 - ss(0.5, 0.92, a)) * FUERZA;
      o[i + 3] = Math.round(255 * (a + (punto - a) * canto));
      const d = B[(y & 3) * 4 + (x & 3)] * 4; // ±2 niveles de trama en el color
      for (let c = 0; c < 3; c++) o[i + c] = Math.max(0, Math.min(255, Math.round(data[i + c] + d + canto * 18)));
    }
    await sharp(o, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 90, alphaQuality: 95 }).toFile(f + '.tmp.webp');
    require('fs').renameSync(f + '.tmp.webp', f);
    console.log(n);
  }
})();
