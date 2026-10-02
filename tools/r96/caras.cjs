// RONDA 96 · «nuestras caras en los diferentes sitios, más realistas, sacadas de los fotogramas nuevos de Eric y Andoni» (juntos.png de la v03, 1200 × 1000).
// Un cuadrado alrededor de cada cabeza, sobre un fondo Nogal cálido (las caras van en círculos sobre oscuro y sobre claro), a 288 px (×2 de 144).
const sharp = require('sharp');
const SRC = 'tools/r95/fundadores/juntos.png';
const CARAS = { andoni: { x: 376, y: 72, l: 180 }, eric: { x: 607, y: 30, l: 180 } };
(async () => {
  for (const [n, c] of Object.entries(CARAS)) {
    const cabeza = await sharp(SRC).extract({ left: c.x, top: c.y, width: c.l, height: c.l }).resize(288, 288, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).toBuffer();
    await sharp({ create: { width: 288, height: 288, channels: 4, background: '#6b4a3c' } }).composite([{ input: cabeza }]).webp({ quality: 88 }).toFile(`public/media/equipo/cara-${n}.webp`);
    console.log('ok', n);
  }
})();
