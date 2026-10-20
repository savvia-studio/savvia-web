// RONDA 267 (4.ª) · las ilustraciones de catálogo de Andoni (image_gen, tools/r267-lamina/catalogo/, PNG 1254 transparentes) a la lámina de la web:
// recortadas a su caja, centradas en un cuadrado con el mismo margen → public/media/equipo/lamina/<afición>.webp, 360 px
const sharp = require('sharp');
// ronda 269 · argumentos opcionales: carpeta de origen y de destino (`tools/r269-roble/objetos public/media/equipo/roble`: los del estilo del árbol)
const [ORIGEN = 'tools/r267-lamina/catalogo', DESTINO = 'public/media/equipo/lamina'] = process.argv.slice(2);
const MAPA = { balon: 'baloncesto', mando: 'mando-play', cafe: 'cafe', futbol: 'tenis', azada: 'azada', airpods: 'airpods' }; // Eric · «Deporte» = tenis
(async () => {
  for (const [dest, src] of Object.entries(MAPA)) {
    const t = await sharp(`${ORIGEN}/${src}.png`).trim({ threshold: 4 }).toBuffer({ resolveWithObject: true });
    const lado = Math.round(Math.max(t.info.width, t.info.height) * +(process.env.MARGEN || 1.1)); // ronda 271: por el motor, MARGEN=1.3 (si no, sus estelas tocan el canto y el motor las estira en una raya)
    await sharp(t.data).resize(lado, lado, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize(360, 360).webp({ quality: 88, alphaQuality: 92 }).toFile(`${DESTINO}/${dest}.webp`);
    console.log(dest, '←', src, t.info.width + '×' + t.info.height);
  }
})();
