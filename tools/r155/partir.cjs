// Ronda 155 · las cuatro láminas del brote (una por estación, mismo encuadre): normalizadas a 1000 × 1500, en espejo (la raíz principal cae hacia
// la izquierda, hacia el comienzo del texto), sin el velo casi invisible que traen (alfa ≤ 16) y partidas por el cuello de la bellota.
const sharp = require('/Users/andonimart/Desktop/savvia/savvia-web/node_modules/sharp');
const OUT = __dirname + '/../../public/media/manifiesto/';
const CORTE = 310; // el cuello bajo la bellota (lo más estrecho), igual en las cuatro
const UMBRAL = 16;
(async () => {
  for (const e of ['primavera', 'verano', 'otono', 'invierno']) {
    const { data, info } = await sharp(`${__dirname}/brote-${e}.webp`).resize(1000, 1500, { fit: 'fill', kernel: 'lanczos3' }).flop().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 3; i < data.length; i += 4) { const a = data[i]; data[i] = a <= UMBRAL ? 0 : Math.round(((a - UMBRAL) / (255 - UMBRAL)) * 255); }
    const buf = await sharp(data, { raw: info }).png().toBuffer();
    await sharp(buf).extract({ left: 0, top: 0, width: 1000, height: CORTE }).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}brote-${e}.webp`);
    await sharp(buf).extract({ left: 0, top: CORTE, width: 1000, height: 1500 - CORTE }).webp({ quality: 82, alphaQuality: 100, smartSubsample: true }).toFile(`${OUT}raices-${e}.webp`);
    console.log(e, 'ok');
  }
})();
