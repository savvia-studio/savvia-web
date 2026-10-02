// RONDA 95 · «te paso para Eric y Andoni nuevos fotogramas»: tiras de 5 celdas 600×1000 y la pose final 1200×1000 → webp a 2× del alto CSS máximo
// (--ch = 400 px → 800 px). SIN recortar el alfa (LEEME: el margen transparente es lo que mantiene la escala constante).
const sharp = require('sharp');
const D = __dirname + '/fundadores/', O = __dirname + '/../../public/media/equipo/';
const H = 800;
(async () => {
  for (const [src, dst] of [['andoni-secuencia.png', 'andoni-paso.webp'], ['eric-secuencia.png', 'eric-paso.webp'], ['juntos.png', 'juntos-r95.webp']]) {
    const m = await sharp(D + src).metadata();
    const w = Math.round((m.width * H) / m.height);
    const info = await sharp(D + src).resize(w, H, { kernel: 'lanczos3' }).webp({ quality: 80, alphaQuality: 90, effort: 6, smartSubsample: true }).toFile(O + dst);
    console.log(dst, info.width, info.height, (info.size / 1024).toFixed(0) + ' KB');
  }
})();
