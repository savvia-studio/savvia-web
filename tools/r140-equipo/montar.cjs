// RONDA 140 · Eric y Andoni con los MASTERS originales (tools/r140-equipo/fuente/masters, 600×1000 por pose, sin ampliar).
// Tiras de 5 celdas (4 pasos + llegada) y la pose final conjunta (1200×1000), en webp con alfa.
const sharp = require('sharp'), path = require('path');
const F = path.join(__dirname, 'fuente/masters'), O = path.join(__dirname, '../../public/media/equipo');
(async () => {
  for (const q of ['andoni', 'eric']) {
    const capas = [1, 2, 3, 4, 5].map((k, i) => ({ input: `${F}/${q}/0${k}.png`, left: i * 600, top: 0 }));
    await sharp({ create: { width: 3000, height: 1000, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(capas).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(`${O}/${q}-paso-r140.webp`);
  }
  await sharp(`${F}/reposo-conjunto.png`).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(`${O}/juntos-r140.webp`);
  console.log('ok');
})();
