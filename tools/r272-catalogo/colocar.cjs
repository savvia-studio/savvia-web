// RONDA 272 · el catálogo definitivo (los 9 objetos de Andoni, tools/r272-catalogo/*.png): teclado en vez del mando, auriculares de cable en vez de los
// AirPods y, en «Deporte» de Eric, el balón de fútbol y la pelota de tenis JUNTOS a su escala real (fútbol 22 cm · tenis 6,7 cm). Cada uno recortado a su
// caja y centrado en un cuadrado → public/media/equipo/lamina/<afición>.webp, 360 px
const sharp = require('sharp'), fs = require('fs');
// ronda 272 · «el espaciado entre objetos tiene que ser el mismo»: cada imagen se guarda RECORTADA a su dibujo (sin aire) y su ancho en la web sale de
// src/data/lamina-medidas.json (fracción del cuadrado de 360 que ocupa el dibujo): así la separación entre objetos es la misma y se mantiene la escala
const medidas = {};
const guardar = async (buf, dest) => { const t = await sharp(buf).resize(360, 360).png().toBuffer().then((b) => sharp(b).trim({ threshold: 4 }).toBuffer({ resolveWithObject: true })); medidas[dest] = +(t.info.width / 360).toFixed(4); await sharp(t.data).webp({ quality: 88, alphaQuality: 92 }).toFile(OUT + dest + '.webp'); };
const D = 'tools/r272-catalogo/', OUT = 'public/media/equipo/lamina/';
const caja = async (f) => (await sharp(D + f + (require('fs').existsSync(D + f + '.png') ? '.png' : '.webp')).trim({ threshold: 4 }).toBuffer({ resolveWithObject: true }));
// el objeto en el centro de un cuadrado de lado max(w, h) × margen, SIN escalarlo (con `fit: contain` se ampliaba hasta llenar y el margen no hacía nada)
const cuadrado = async (buf, w, h, margen = 1.1) => {
  const l = Math.round(Math.max(w, h) * margen), x = Math.floor((l - w) / 2), y = Math.floor((l - h) / 2), T = { r: 0, g: 0, b: 0, alpha: 0 };
  return sharp(buf).extend({ left: x, right: l - w - x, top: y, bottom: l - h - y, background: T }).png().toBuffer();
};
(async () => {
  // ronda 272 · «el balón de baloncesto igual debería ser como el de fútbol de grande»: a escala real con el de fútbol (24 cm frente a 22 cm). En «Deporte» el
  // fútbol mide 600 de un cuadrado de 819 × 1,06 = 868: el de baloncesto, 600/868 × 24/22 de su cuadrado → margen = su inverso
  const MARGEN = { balon: 1 / (600 / 868 * 24 / 22) };
  MARGEN.futbol = MARGEN.balon; // ronda 275 · «la pelota de tenis como la de baloncesto de grande» (y en «Música», el iPod con sus auriculares: ipod.webp)
  // ronda 273 · azada y auriculares nuevos de Andoni (azada-cultivar, auriculares-ipod)
  for (const [dest, src] of Object.entries({ balon: 'baloncesto', mando: 'teclado-gamer', cafe: 'cafe', azada: 'azada-cultivar', airpods: 'ipod', futbol: 'tenis' })) {
    const t = await caja(src);
    await guardar(await cuadrado(t.data, t.info.width, t.info.height, MARGEN[dest] ?? 1.1), dest);
    console.log(dest, '←', src);
  }
  // ronda 273 · Andoni: «en el caso de Eric vamos a dejar solo la pelota de tenis más grande como antes»: fuera el balón de fútbol (la composición a escala, en el historial)
  fs.writeFileSync('src/data/lamina-medidas.json', JSON.stringify(medidas, null, 2) + '\n');
})();
